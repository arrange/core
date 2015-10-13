<?php namespace App\Http\Requests;
/**
 * Created by PhpStorm.
 * User: Temp
 * Date: 12-Oct-15
 * Time: 3:03 PM
 */

use Illuminate\Http\Request AS InputRequest;

class ChangeProfileRequest extends Request {

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
	public function rules(InputRequest $request)
	{
		$id = $request->input('id');
		return [
			'id' => 'required',
			'email'	=>	'required|email|unique:users,email,'.$id
		];
	}

	public function response(array $errors)
	{
		return response()->json($errors,422);
	}

}
