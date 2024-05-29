namespace Ingenian.Module.Common.DTO
{
	public class ResponseDTO<T>
	{
		public bool Status { get; set; }
		public string? Message { get; set; }
		public T? Data { get; set; }
	}
}