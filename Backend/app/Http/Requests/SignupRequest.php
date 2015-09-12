<?php namespace App\Http\Requests;
/**
 * Created by PhpStorm.
 * User: Temp
 * Date: 25-Aug-15
 * Time: 5:41 PM
 */

class SignUpRequest extends Request {

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
			'name'	=>	'required',
			'email'		=>	'required|email|unique:users,email',
			'subdomain' =>  'required|unique:organizations,subdomain'
		];
	}

	public function response(array $errors)
	{
		return response()->json($errors,422);
	}

}
