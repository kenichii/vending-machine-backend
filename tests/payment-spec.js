const { expect } = require('chai')


// Services
const paymentService = require('../api/controllers/payment');



const payload = {
  "cash": 10.20,
  "items": [
      { 
          "_id": "622711893c6bec2a25f7f0cd",
          "total": 2,
          "price": 2.5
      },
       { 
           "_id":  "622711ad8d599da7240ff374",
           "total": 1,
           "price": 3.1
      }
  ]
};

describe("POST /payment/process", () => {
  beforeEach((done) => {
    done();
  });

  afterEach((done) => {
    done();
  })

  context("Payment Service", () => {
    context("validatePayload", () => {
      it("Return total when item is not empty", async () => {

        let total = await paymentService.validatePayload(payload);
  
        expect(payload.items).to.be.not.undefined;
        expect(total).to.be.not.undefined;
  
      })
    });

    context("computeChange", () => {
      it("Return change when result is not 0", async () => {
        let total = await paymentService.validatePayload(payload);
        let result = await paymentService.computeChange(payload, total);

        expect(parseFloat(result, 2)).to.be.not.lessThan(0);
      })

      it("Throw error when result is negative", async () => {
        const invalidData =  {
          "cash": 2.20,
          "items": [
              { 
                  "_id": "622711893c6bec2a25f7f0cd",
                  "total": 2,
                  "price": 2.5
              },
               { 
                   "_id":  "622711ad8d599da7240ff374",
                   "total": 1,
                   "price": 3.1
              }
          ]
        };
        
  
        try {
          let total = await paymentService.validatePayload(invalidData);
          return paymentService.computeChange(invalidData, total);
        } catch(error) {
          expect(error).to.deep.equal({
            http_code: 400,
            error_code: "CASH_INSUFFICIENT",
            message: "Cash is insufficient."
          });
        }
      })
    })
  })
})
