using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging.Abstractions;
using MiniCodeProject.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace MiniCodeProject.Tests.ControllerTests
{
    public class When_Calculating_Result
    {
        [Theory]
        [InlineData(1.5, 0.5)]
        [InlineData(0.5, -0.5)]
        public void With_Invalid_Inputs__CombinedWith_Function_Returns_BadRequest(decimal inputA, decimal inputB)
        {
            // Arrange
            var stubLoggerFactory = new NullLoggerFactory();
            var controller = new CalculationController(stubLoggerFactory);

            // Act
            var response = controller.CalculateCombinedWithResult(inputA, inputB);

            // Assert
            Assert.IsType<BadRequestResult>(response.Result);
        }

        [Theory]
        [InlineData(0.5, 0.5, 0.25)]
        [InlineData(0.25, 0.25, 0.0625)]
        [InlineData(0.75, 0.75, 0.5625)]
        public void With_Valid_Inputs__CombinedWith_Function_Returns_Expected_Result(decimal inputA, decimal inputB, decimal expectedResult)
        {
            // Arrange
            var stubLoggerFactory = new NullLoggerFactory();
            var controller = new CalculationController(stubLoggerFactory);

            // Act
            var response = controller.CalculateCombinedWithResult(inputA, inputB);

            // Assert
            Assert.IsType<OkObjectResult>(response.Result);
            Assert.Equal(expectedResult, (response.Result as OkObjectResult).Value);
        }


        [Theory]
        [InlineData(1.5, 0.5)]
        [InlineData(0.5, -0.5)]
        public void With_Invalid_Inputs__Either_Function_Returns_BadRequest(decimal inputA, decimal inputB)
        {
            // Arrange
            var stubLoggerFactory = new NullLoggerFactory();
            var controller = new CalculationController(stubLoggerFactory);

            // Act
            var response = controller.CalculateEitherResult(inputA, inputB);

            // Assert
            Assert.IsType<BadRequestResult>(response.Result);
        }
        [Theory]
        [InlineData(0.5, 0.5, 0.75)]
        [InlineData(0.25, 0.25, 0.4375)]
        [InlineData(0.75, 0.75, 0.9375)]
        public void With_Valid_Inputs__Either_Function_Returns_Expected_Result(decimal inputA, decimal inputB, decimal expectedResult)
        {
            // Arrange
            var stubLoggerFactory = new NullLoggerFactory();
            var controller = new CalculationController(stubLoggerFactory);

            // Act
            var response = controller.CalculateEitherResult(inputA, inputB);

            // Assert
            Assert.IsType<OkObjectResult>(response.Result);
            Assert.Equal(expectedResult, (response.Result as OkObjectResult).Value);
        }
    }
}
