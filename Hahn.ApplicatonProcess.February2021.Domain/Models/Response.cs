namespace Hahn.ApplicatonProcess.February2021.Domain.Models
{
    public class Response<T>
    {

        public bool Success { get; set; } = false;
        public T Data { get; set; }
        public string Message { get; set; }

    }
}
