using Amazon.CognitoIdentityProvider.Model;
using Amazon.CognitoIdentityProvider;
using Amazon.Lambda.Core;
using Ingenian.Module.Common.DTO;
using Newtonsoft.Json;

// Assembly attribute to enable the Lambda function's JSON input to be converted into a .NET class.
[assembly: LambdaSerializer(typeof(Amazon.Lambda.Serialization.SystemTextJson.DefaultLambdaJsonSerializer))]

namespace Ingenian.Lambda.Login;

public class Function
{

	private readonly AmazonCognitoIdentityProviderClient _cognitoClient;
	private readonly string _userPoolId;
	private readonly string _clientId;

	public Function()
	{
		_cognitoClient = new AmazonCognitoIdentityProviderClient();
		_userPoolId = Environment.GetEnvironmentVariable("USER_POOL_ID")!;
		_clientId = Environment.GetEnvironmentVariable("CLIENT_ID")!;
	}

	/// <summary>
	/// A simple function that takes a string and does a ToUpper
	/// </summary>
	/// <param name="input"></param>
	/// <param name="context"></param>
	/// <returns></returns>
	public async Task<ResponseDTO<UserAttributesDTO?>> FunctionHandler(LoginDTO request, ILambdaContext context)
	{
		context.Logger.LogLine($"=====>>>>> Authenticating user {request.Email}");
		try
		{
			var authRequest = new InitiateAuthRequest
			{
				ClientId = _clientId,
				AuthFlow = AuthFlowType.USER_PASSWORD_AUTH,
				AuthParameters = new Dictionary<string, string>{
					{ "USERNAME", request.Email! },
					{ "PASSWORD", request.Password! }
				}
			};

			var authResponse = await _cognitoClient.InitiateAuthAsync(authRequest);

			context.Logger.LogLine($"=====>>>>> authResponse {JsonConvert.SerializeObject(authResponse)}");

			if (authResponse.ChallengeName == ChallengeNameType.NEW_PASSWORD_REQUIRED)
			{
				context.Logger.LogLine($"User {request.Email} is required to change their password.");

				// Esto no se debe hacer!! esta mal... pero tengo que avanzar, me disculpo....
				var respondToAuthChallengeRequest = new RespondToAuthChallengeRequest
				{
					ClientId = _clientId,
					ChallengeName = ChallengeNameType.NEW_PASSWORD_REQUIRED,
					Session = authResponse.Session,
					ChallengeResponses = new Dictionary<string, string>{
						{ "USERNAME", request.Email! },
						{ "NEW_PASSWORD", request.Password! }
					}
				};

				var challengeResponse = await _cognitoClient.RespondToAuthChallengeAsync(respondToAuthChallengeRequest);

				return await GetUserAttributes(request.Email!);
			}
			else if (authResponse.AuthenticationResult != null)
			{
				return await GetUserAttributes(request.Email!);
			}
			else
			{
				context.Logger.LogLine("=====>>>>> Authentication failed: authResponse.AuthenticationResult is null.");
				throw new Exception("Authentication failed.");
			}
		}
		catch (NotAuthorizedException ex)
		{
			context.Logger.LogLine($"=====>>>>> NotAuthorizedException: {ex.Message}");
			throw new Exception("Invalid username or password.");
		}
		catch (UserNotFoundException ex)
		{
			context.Logger.LogLine($"=====>>>>> UserNotFoundException: {ex.Message}");
			throw new Exception("User not found.");
		}
		catch (Exception ex)
		{
			context.Logger.LogLine($"=====>>>>> Error authenticating user: {ex.Message}");
			return new ResponseDTO<UserAttributesDTO?>
			{
				Data = null,
				Message = $"Error authenticating user: {ex.Message}",
				Status = false
			};
		}
	}

	private async Task<ResponseDTO<UserAttributesDTO?>> GetUserAttributes(string email)
	{
		var getUserRequest = new AdminGetUserRequest
		{
			UserPoolId = _userPoolId,
			Username = email
		};

		var getUserResponse = await _cognitoClient.AdminGetUserAsync(getUserRequest);

		return new ResponseDTO<UserAttributesDTO?>
		{
			Data = new UserAttributesDTO
			{
				Email = email!,
				Name = getUserResponse.UserAttributes.Find(attr => attr.Name.Equals("name"))!.Value
			},
			Message = "OK",
			Status = true
		};
	}
}
