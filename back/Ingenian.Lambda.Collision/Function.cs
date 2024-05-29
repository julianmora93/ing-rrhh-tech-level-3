using Amazon.Lambda.Core;
using Ingenian.Module.Common.DTO;

// Assembly attribute to enable the Lambda function's JSON input to be converted into a .NET class.
[assembly: LambdaSerializer(typeof(Amazon.Lambda.Serialization.SystemTextJson.DefaultLambdaJsonSerializer))]

namespace Ingenian.Lambda.Collision;

public class Function
{

	/// <summary>
	/// A simple function that takes a string and does a ToUpper
	/// </summary>
	/// <param name="input"></param>
	/// <param name="context"></param>
	/// <returns></returns>
	//public async Task<object> FunctionHandler(APIGatewayHttpApiV2ProxyRequest request, ILambdaContext context)
	public async Task<object> FunctionHandler(string input, ILambdaContext context)
	{
		try
		{
			int n = input.Length;
			int[] collisions = new int[n];
			bool changes = true;
			while (changes)
			{
				changes = false;
				char[] newSequence = input.ToCharArray();
				int[] countCollisions = (int[])collisions.Clone();
				for (int i = 0; i < n - 1; i++)
				{
					if (input[i] == 'R' && input[i + 1] == 'L')
					{
						countCollisions[i]++;
						countCollisions[i + 1]++;
						newSequence[i] = 'L';
						newSequence[i + 1] = 'R';
						changes = true;
					}
				}
				input = new string(newSequence);
				collisions = (int[])countCollisions.Clone();
			}

			return new ResponseDTO<string>
			{
				Message = "OK",
				Data = string.Join(" ", collisions),
				Status = true
			};
		}
		catch(Exception ex)
		{
			return new ResponseDTO<string>
			{
				Message = ex.Message,
				Data = string.Empty,
				Status = false
			};
		}
	}

}