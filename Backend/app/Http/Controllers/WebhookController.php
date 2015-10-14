<?php namespace App\Http\Controllers;

class WebhookController extends \Laravel\Cashier\WebhookController{
	public function handleInvoicePaymentSucceeded($payload)
	{
		$aInputs = json_decode($payload);
		if( $aInputs->data ){
			$oUser = User::where('stripe_id','=',$aInputs->data->object->customer)->first();
			if( $oUser ) {
				$sEndDate = $aInputs->data->object->lines->data->period->end; //timestamp
				$oUser->subscription_ends_at = date('Y-m-d H:i:s',$sEndDate);
				$oUser->save();
			}
		}
	}
}