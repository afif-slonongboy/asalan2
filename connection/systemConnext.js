//@Afif.p.p
/**
         [ CREDITS ]
         * Coding by @Afif.p.4ks
         * @ YT : https://youtube.com/c/4KSanzz
         * @ YT CHANNEL : 4KsanZ
         * @ WhatsAp
*/
let { loading } = require('./starting')

const Connecting = async ({ update, client, Boom, DisconnectReason, sleep, operate }) => {

  const { connection, lastDisconnect } = update
  if (connection === 'connecting') {
    console.log('INFO', update)
  }
  //response if there is a failure/error in connection                       	             
  if (connection === 'close') {
    let messageconnect = new Boom(lastDisconnect?.error)?.output.statusCode
    if (messageconnect === DisconnectReason.badSession) {
      console.log(`Sorry, it looks like the session file is disabled. Please re-scan🙏`)
      client.logout();
      console.log('Mengkoneksikan ulang dalam 10 detik....')
      setTimeout(() => {
        operate();
      }, 10000)
    } else if (messageconnect === DisconnectReason.connectionClosed) {
      console.log("Connection lost, trying to reconnect🔄");
      operate();
    } else if (messageconnect === DisconnectReason.connectionReplaced) {
      console.log("Another connection is replaced, please close this connection first");
      process.exit();
    } else if (messageconnect === DisconnectReason.restartRequired) {
      console.log("An error occurred, reconnecting🔄");
      setTimeout(() => {
        operate();
      }, 10000)
    } else if (messageconnect === DisconnectReason.connectionLost) {
      console.log("Connection lost from the web, trying to reconnect🔄");
      setTimeout(() => {
        operate();
      }, 10000)
    } else if (messageconnect === DisconnectReason.loggedOut) {
      console.log(`Device is out, please re-scan🔄`);
      process.exit();
    } else if (messageconnect === DisconnectReason.timedOut) {
      console.log("Connection reached the limit, please reload🔄");
      operate();
    } else client.end(`Reason : ${messageconnect}|${connection}`)
  }
  if (connection === 'open') {
    //clearing logs in terminal
    console.clear()
    //start progress
    loading()
    //silent for 5.5 seconds
    await sleep(5500)
    //displays information that it is connected
    console.log('connected✔️')
  }
}

module.exports = { Connecting }       