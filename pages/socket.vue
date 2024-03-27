<script setup>
  let ws;
  const messages = ref([]);

  /**
   * Connecte le client au serveur WebSocket.
   */
  const connect = async () => {
    const isSecure = location.protocol === 'https:';
    const url = `${(isSecure ? 'wss://' : 'ws://') + location.host}/_ws`;

    if (ws) {
      ws.close();
    }

    ws = new WebSocket(url);
    ws.addEventListener('message', (event) => {
      const message = event.data;
      console.log(message);
      messages.value.push(message);
    });

    await new Promise((resolve) => {
      return ws.addEventListener('open', resolve);
    });
  };

  /**
   * Envoie un ping au serveur WebSocket.
   */
  const ping = () => {
    console.log('ws envoi ping');
    ws.send('ping');
  };
</script>

<template>
  <div>Messages: {{ messages }}</div>
  <button @click="connect">Connecter</button>
  <button @click="ping">Ping</button>
</template>
