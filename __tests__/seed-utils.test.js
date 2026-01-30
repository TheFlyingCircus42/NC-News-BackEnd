const { createLookUpObject } = require("../db/seeds/seed-utils")

describe("createLookUpObject", ()=>
    {
        test("createLookUpObject should be a function", ()=>
            {
                expect(typeof createLookUpObject).toBe("function")
            });
        test("should return an object when passed an empty array" , ()=> 
            {
                expect (createLookUpObject([],"A","B")).toEqual({})
            });
        test("should return an object with a single Key:Value pair when passed a single object", ()=>
            {
                const inputArray = [{ Name: "Bob" , Pet : "Otis" }]
                expect(createLookUpObject(inputArray , 'Name' , 'Pet')).toEqual({Bob : "Otis"})
            });
        test("returns an object with multiple key:value pairs when passed an array with multiple objects", ()=>
            {
                const inputArray =
                [
                    {city : "Manchester" , street : "Bee Avenue" , doorNo : "8" },
                    {city : "London" , street : "Baker Street" , doorNo : "7" },
                    {city : "Southampton" , street : "Dock Road" , doorNo : "123" },                    
                    {city : "Cardiff" , street : "Dragon Lane" , doorNo : "48" },                
                ]

                const expected = 
                {
                    Manchester : "Bee Avenue" ,
                    London : "Baker Street" ,
                    Southampton : "Dock Road" ,
                    Cardiff : "Dragon Lane"
                }
                expect(createLookUpObject(inputArray , 'city' , 'street')).toEqual(expected)
            })
            test('should not mutate input data',()=>
            {
                const inputArray = [{colour : 'red' , type : 'car'} , {colour : 'blue' , type : 'bike'}]; 
                const cloneInput = [{colour : 'red' , type : 'car'} , {colour : 'blue' , type : 'bike'}];
                createLookUpObject(inputArray , 'colour' , 'type')
                expect(inputArray).toEqual(cloneInput)
            })
    })
