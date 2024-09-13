import { useEffect } from 'react';

const TawkToChat = () => {
  useEffect(() => {
    var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
    (function() {
      var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
      s1.async = true;
      s1.src='https://embed.tawk.to/66e353e1ea492f34bc12aad5/1i7jvvah9';
      s1.charset = 'UTF-8';
      s1.setAttribute('crossorigin', '*');
      s0.parentNode.insertBefore(s1, s0);
    })();

    // Listen for the widget load event
    Tawk_API.onLoad = function() {
      console.log("Tawk.to widget loaded");
    };
  }, []);

  // Hide widget
  const hideWidget = () => {
    if (window.Tawk_API) {
      window.Tawk_API.hideWidget();
    }
  };

  // Show widget
  const showWidget = () => {
    if (window.Tawk_API) {
      window.Tawk_API.showWidget();
    }
  };
  const openChat = () => {
    if (window.Tawk_API) {
      window.Tawk_API.maximize(); // Opens the Tawk.to chat widget
    }
  };

  return (
    <div>
      <button onClick={showWidget}>Show Chat</button>
      <button onClick={hideWidget}>Hide Chat</button>
      <button onClick={openChat}>Chat with Us!</button>
    </div>
  );
};

export default TawkToChat;
