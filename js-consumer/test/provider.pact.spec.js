const expect = require('chai').expect
const path = require('path')
const chai = require('chai')
const { Pact } = require('@pact-foundation/pact')
const axios = require('axios')

describe('The Hello API', () => {
  let url = 'http://localhost'
  const port = 33098

  const provider =  new Pact({
    port: port,
    log: path.resolve(process.cwd(), 'logs', 'mockserver-integration.log'),
    // dir: path.resolve(process.cwd(), 'pacts'),
    spec: 2,
    consumer: 'JSConsumer',
    provider: 'test-provider'
  })

  before(async function()  {
       this.timeout(10000) // it takes time to start the mock server
      await provider.setup()

  })

  after(async function() {
      this.timeout(10000) // it takes time to stop the mock server and gather the contracts
      await provider.finalize()
  })

  describe('get request Test', () => {
    before(done => {
      const interaction = {
          uponReceiving: 'making a request from JS consumer',
          withRequest: {
              method: 'GET',
              path: '/'
          },
          willRespondWith: {
              status: 200,
              headers: {
                  "Content-Type": "application/json"
              },
              body: {
                  name: "Vinod"
              }
          }
      }
       provider.addInteraction(interaction).then(() => {
        done()
      })
    })

    afterEach(() => provider.verify())

    it("should return hello message",  function(done)   {
        sendHelloRequest().then(function(resp) {
            expect(resp.data).to.deep.equal({name: "Vinod"});
            done()
        })
    });
  })
})

function sendHelloRequest() {

    return axios.request({
      method: 'GET',
      baseURL: 'http://localhost:33098',
      url: '/',
      headers: { 'Accept': 'application/json' }
    })
}
