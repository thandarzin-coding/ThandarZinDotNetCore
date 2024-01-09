using ThandarZinDotNetCore.ConsoleApp.AdoDotNetExample;
using ThandarZinDotNetCore.ConsoleApp.DapperExamples;
using ThandarZinDotNetCore.ConsoleApp.EfCoreExamples;

Console.WriteLine("Hello, World!");

//AdoDotNetExample adoDotNetExample = new AdoDotNetExample();
//adoDotNetExample.Run();

//DapperExample dapperExample = new DapperExample();
//dapperExample.Run

EfCoreExample efCoreExample = new EfCoreExample();
efCoreExample.Run();


Console.ReadKey();

