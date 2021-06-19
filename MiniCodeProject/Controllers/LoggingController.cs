using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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

            _logger.Log(request.LogLevel, request.Message);

            return new OkResult();
        }
    }
}
