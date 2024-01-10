using ThandarZinDotNetCore.ConsoleApp.AdoDotNetExample;
using ThandarZinDotNetCore.ConsoleApp.DapperExamples;
using ThandarZinDotNetCore.ConsoleApp.EfCoreExamples;
using ThandarZinDotNetCore.ConsoleApp.HttpClientExamples;
using ThandarZinDotNetCore.ConsoleApp.RefitExamples;

Console.WriteLine("Hello, World!");

//AdoDotNetExample adoDotNetExample = new AdoDotNetExample();
//adoDotNetExample.Run();

//DapperExample dapperExample = new DapperExample();
//dapperExample.Run

HttpClientExample httpClientExample = new HttpClientExample();
await httpClientExample.Run();


////EfCoreExample efCoreExample = new EfCoreExample();
////efCoreExample.Run();

//RefitExample refitExample = new RefitExample();
//await refitExample.Run();

//RefitExample refitExample = new RefitExample();
//await refitExample.Run();

Console.ReadKey();

