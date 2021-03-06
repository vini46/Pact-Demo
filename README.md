# pact-demo
Pact Demo<br/>
Introduction to Contract Testing and Pact can be found in the ppt [here](https://github.com/vini46/Pact-Demo/blob/master/presentation/Contract-Testing-In-Theory-and-Practice.pptx)<br/>

Docs for Pact can be found on Pact's official [website](http://pact.io/)<br/>
 Getting started [documentation](https://docs.pact.io/getting_started/)<br/>
 Implementation [Guide](https://docs.pact.io/implementation_guides/javascript)

* Consumer
  * Import the consumer project to a Editor
  * Run `gradle test`
  * This will generate pact json in the target/pacts folder

* JSConsumer
  * Import the consumer project to Idea
  * Run `npm i`
  * To run the tests use the command `npm run test`
  * This will generate pact json in the pacts folder

* Broker
  * Now that you have the pact json, we need to publish it to the broker so that the provider can access it
  * Install postgres
  * Run `docker-compose up` in the broker folder
  * Make sure broker is running and then run `gradle pactPublish` inside java-consumer project and `npm run publishPact`   
    in JSConsumner project
  * Now you should be able to see the pact file published on the broker UI

* Provider
  * Go to provider project
  * Run the SpringBoot application by giving the command `./gradlew bootRun`
  * Run `gradle pactVerify`
  * The pact broker will now show verified
