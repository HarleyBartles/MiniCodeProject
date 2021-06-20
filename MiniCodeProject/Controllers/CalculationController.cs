using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace MiniCodeProject.Controllers
{
    [Route("api/[controller]")]
    public class CalculationController : Controller
    {
        private readonly ILogger<CalculationController> _logger;
        public CalculationController(ILoggerFactory loggerFactory)
        {
            _logger = loggerFactory.CreateLogger<CalculationController>();
        }

        [HttpGet("combined-with")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<decimal> CalculateCombinedWithResult([FromQuery] decimal inputA, [FromQuery] decimal inputB)
        {
            if (!ModelState.IsValid || !InputIsValid(inputA) || !InputIsValid(inputB))
                return BadRequest();

            _logger.LogInformation("Request received! Function: CombinedWith");
            _logger.LogInformation($"Input Parameters: { inputA }, { inputB }");

            // in a larger application we'd send a request off to the service layer to do what it needs to do
            // in an async solution we'd return the requestId to the ui to confirm it was recieved and later dispatch a SignalR message with the result
            // this requirement is very simple though, no point - KISS
            
            decimal result = inputA * inputB;

            _logger.LogInformation($"Calculated result: {result}");

            return new OkObjectResult(result);    
        }

        [HttpGet("either")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<decimal> CalculateEitherResult([FromQuery] decimal inputA, [FromQuery] decimal inputB)
        {
            if (!ModelState.IsValid || !InputIsValid(inputA) || !InputIsValid(inputB))
                return BadRequest();

            _logger.LogInformation("Request received! Function: Either");
            _logger.LogInformation($"Input Parameters: { inputA }, { inputB }");

            decimal result = inputA + inputB - (inputA * inputB);

            _logger.LogInformation($"Calculated result: {result}");

            return new OkObjectResult(result);
        }

        private bool InputIsValid(decimal input)
        {
            if (input < 0 || input > 1)
                return false;

            return true;
        }
    }
}
