const {redis} = require(redis);

describe("Redis rpush:", () => {
    let client;
    beforeEach( () => {
        client = redis.createClient();
        client.rpush("names", "Maria", "Jack", "Alice", "Jinny");
    })

    afterEach( () => {
        client.flushall()
        client.quit();
    })

    test("check the number of elements", done => {
            client.llen("names", (err, data) => {
                expect(data).toBe(4);
                done();
        })
    });


     test("check if it adds an element to a list", done => {
            client.lrange("names", 0, -1, (err, data) => {
                expect(data).toContain("Jack");
                done();
            })
        });
    })

describe("Redis llen:", () => {
    let client;
    beforeEach( () => {
        client = redis.createClient();
        client.rpush("numbers", "1", "2", "3", "4", "5", "6");
    })

    afterEach( () => {
        client.flushall()
        client.quit();
    })

    test("check if the length is defined", done => {
            client.llen("numbers", (err, data) => {
                expect(data).toBeDefined();
                done();
            })
        });

    test("check if length is correct", done => {
        client.llen("numbers", (err, data) => {
            expect(data).toEqual(6);
            done();
        })
    });

describe("Redis lrange:", () => {
    let client;
    beforeEach( () => {
        client = redis.createClient();
        client.rpush("numbers", "1", "2", "3", "4", "5", "6");
    })

    afterEach( () => {
        client.flushall()
        client.quit();
    })

    test("check if lrange returns correct elements", done => {
        const res = ["2", "3"];
        client.lrange("numbers", 1, 2, (err, data) => {
            expect(data).toEqual(res);
            done();
            })
        });
    });

describe("Redis lpop:", () => {
    let client;
    beforeEach( () => {
        client = redis.createClient();
        client.rpush("numbers", "1", "2", "3", "4", "5", "6");
    })

    afterEach( () => {
        client.flushall()
        client.quit();
    })

    test("check if it deletes the element", done => {
        client.lpop("numbers", (err, data) => {
            expect(data).toEqual("1");
            done();
        })
    });

    test("check if the element is defined", done => {
        client.lpop("numbers", (err, data) => {
            expect(data).not.toBeUndefined();
            done();
            })
        });
    });

describe("Redis linsert:", () => {
    let client;
    beforeEach( () => {
        client = redis.createClient();
        client.rpush("letters", "A", "B", "C", "D", "E", "F");
    })

    afterEach( () => {
        client.flushall();
        client.quit();
    })

    test("check the index of inserted element", done => {
        client.linsert("letters", "after", "C", 10, () => {
            client.lindex("letters", 3, (err, data) => {
                expect(data).toEqual("10");
                done();
            })
        });
    });

    test("check if the element is inserted", done => {
       client.linsert("letters", "before", "A", 0, (err, data) => {
            expect(data).toEqual(7);
            done();
            })
        });
    });
})
