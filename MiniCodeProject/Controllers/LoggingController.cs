using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace MiniCodeProject.Controllers
{
    [Route("api/[controller]")]
    public class LoggingController : Controller
    {
        private readonly ILogger<LoggingController> _logger;

        public LoggingController(ILoggerFactory loggerFactory)
        {
            _logger = loggerFactory.CreateLogger<LoggingController>();
        }

        public class LogRequest
        {
            public LogLevel LogLevel { get; set; }
            public string Message { get; set; }
        }

        [HttpPost("log-to-file-system")]
        public IActionResult LogToFile([FromBody] LogRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            // The log level gets lost between winston in the ui and here
            // For now, just gonna log all ui logs as info
            // ToDo: technical debt, figure this out and fix it or better still use a ui logger more appropriate for the task such as Elmah

            //_logger.Log((LogLevel)request.LogLevel, request.Message);
            _logger.LogInformation($"UI LOG: {request.Message}");
            
            return new OkResult();
        }
    }
}
