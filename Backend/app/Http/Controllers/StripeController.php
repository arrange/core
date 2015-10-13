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
			if( !empty($oUser->subscription_ends_at) ){
				\Stripe\Stripe::setApiKey( env( 'STRIPE_API_SECRET' ) );
				$cu = \Stripe\Customer::retrieve($oUser->stripe_id);
				$subscription = $cu->subscriptions->retrieve($oUser->stripe_subscription);
				$subscription->plan = $request->input( 'plan' );
				$subscription->save();
				$oUser->stripe_plan = $request->input( 'plan' );
				$oUser->save();
			}
			else {
				$aInputData = $request->only( array( 'exp_month' , 'exp_year' , 'cvc' , 'number' , 'plan' ) );
				$aInputData[ 'default_for_currency' ] = true;
				$aInputData[ 'object' ] = "card";
				$oUser->subscription( $request->input( 'plan' ) )
					->create( $aInputData );
				$oUser->trial_ends_at = null;
				$oUser->subscription_ends_at = date('Y-m-d H:i:s',strtotime('+30 days'));
				$oUser->save();
			}
			return response()->json($oUser->toArray());
		}
		return response()->json(array('error'=>'Something went wrong,Please try again'),500);
	}

	public function getTransactions(Guard $auth){
		$oUser = $auth->user();
		dd($oUser);
		$aInvoices = $oUser->invoices();

		/*\Stripe\Stripe::setApiKey( env( 'STRIPE_API_SECRET' ) );

		$aInvoices = \Stripe\Invoice::all();*/
		return response()->json($aInvoices);
	}

	public function postCancelSubscription(Guard $auth){
		$oUser = $auth->user();
		$oUser->subscription()->cancel();
		$oUser->stripe_subscription = null;
		$oUser->stripe_id = null;
		$oUser->last_four = null;
		$oUser->subscription_ends_at = null;
		$oUser->stripe_plan = null;
		$oUser->save();
		return response()->json($oUser->toArray());
	}
}