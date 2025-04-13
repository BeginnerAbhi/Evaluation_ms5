function createFunctionRegistry()
{
    const registry=new Map();

    return{

        registerFunction(name,fn)
        {
            if(typeOf(fn)!=="function")
            {
                throw new Error("Bring the proper function");
            }

            registry.set(name,fn);
        },

        executeFunction(name,args=[],context=null)
        {
            if(! registry.has(name))
            {
                throw new Error("function '${name}' doesnt exist");
            }

            return registry.get(name).apply(context,args);

        },

        mapFunction(name,dataArray)
        {
            if(!registry.has(name))
            {
                throw new Error("function '${name}' doesn't exist")

            }
            return dataArray.map(registry.get(name));
        },

        filterFunctions(name,dataArray)
        {
            if(!registry.has(name))
            {
                throw new Error("function '${name}' doesn't exist");
            }

            return dataArray.filter(registry.get(name));
        },

        reduceFunctions(name,dataArray,initialValue)
        {
            if(!registry.has(name))
            {
                throw new Error("function '${name}' doesn't exist");
            }

            return dataArray.reduce(registry.get(name),initialValue);
        },

        executeFunctionAsync(name,args=[],delay=0)
        {
            if(!registry.has(name))
            {
                throw new Error("function '${name}' doesn't exist");
            }

            return new Promise((resolve)=>{
                setTimeout(()=>resolve(registry.get(name).apply(null,args)),delay);
            });
        },

        exportRegistry()
        {
            return JSON.stringify([...registry.keys()]);
        }


    };

    
}

//usage
const registry = createFunctionRegistry();
registry.registerFunction("double", x => x * 2);
console.log(registry.executeFunction("double", [5]));

registry.executeFunctionAsync("double", [4], 2000).then(console.log);

