<?php namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Auth\Guard;

class StripeController extends Controller
{

	public function getPlans(){
		\Stripe\Stripe::setApiKey( env( 'STRIPE_API_SECRET' ) );
		$aPlans = \Stripe\Plan::all();
		return response()->json( $aPlans );
	}

	public function postChangePlan( Request $request , Guard $auth ){
		if ( $request->input( 'plan' ) ) {
			$oUser = $auth->user();
			if( !$oUser->ever_subscribed ){
				$this->validate($request, [
					'exp_month' => 'required|digits_between:1,12',
					'exp_year' => 'required|digits:4',
					'cvc' => 'required|digits:3',
					'number' => 'required|digits:16'
				]);
				$aInputData = $request->only( array( 'exp_month' , 'exp_year' , 'cvc' , 'number' , 'plan' ) );
				$aInputData[ 'default_for_currency' ] = true;
				$aInputData[ 'object' ] = "card";
				$oUser->subscription( $request->input( 'plan' ) )
					->create( $aInputData );
				$oUser->trial_ends_at = null;
				$oUser->subscription_ends_at = date('Y-m-d H:i:s',strtotime('+30 days'));
				$oUser->save();
				return response()->json($oUser->toArray());
			}
			else if( $oUser->cancelled ){
				if( $request->input( 'plan' ) == $oUser->stripe_plan && $oUser->subscription_ends_at >= date('d-m-Y H:i:s')){
					$oUser->subscription( $request->input( 'plan' ) )->resume();
				}
				else {
					$oUser->subscription( $request->input( 'plan' ) )->swap();
				}
				return response()->json($oUser->toArray());
			}
			else if( $oUser->subscribed ){
				$oUser->subscription( $request->input( 'plan' ) )->swap();
				return response()->json($oUser->toArray());
			}
		}
		return response()->json(array('error'=>'Something went wrong,Please try again'),500);
	}

	public function getTransactions(Guard $auth){
		$oUser = $auth->user();
		$aInvoices = $oUser->invoices();
		$response = array();
		foreach($aInvoices as $oInvoice )
		{
			$invoice = $oInvoice->getStripeInvoice()->jsonSerialize();
			foreach( $invoice['lines']['data'] as $item ) {
				$item['period']['start'] = date('Y-m-d H:i:s',$item['period']['start']);
				$item['period']['end'] = date('Y-m-d H:i:s',$item['period']['end']);
				$response[ 'history' ][ ] = $item;
			}
		}
		return response()->json($response);
	}

	public function postCancelSubscription(Guard $auth){
		$oUser = $auth->user();
		$oUser->subscription()->cancel();
		return response()->json($oUser->toArray());
	}
}