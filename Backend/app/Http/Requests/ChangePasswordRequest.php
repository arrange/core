<?php namespace App\Http\Requests;
/**
 * Created by PhpStorm.
 * User: Temp
 * Date: 12-Oct-15
 * Time: 3:44 PM
 */

class ChangePasswordRequest extends Request{

	/**
	 * Determine if the user is authorized to make this request.
	 *
	 * @return bool
	 */
	public function authorize()
	{
		return true;
	}

	/**
	 * Get the validation rules that apply to the request.
	 *
	 * @return array
	 */
	public function rules()
	{
		return [
			'old_password' => 'required',
			'password' => 'required|confirmed'
		];
	}

	public function response(array $errors)
	{
		return response()->json($errors,422);
	}
}