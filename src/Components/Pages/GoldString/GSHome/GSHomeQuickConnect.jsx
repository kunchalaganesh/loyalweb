import React from "react";

export default function GSHomeQuickConnect() {
  return (
    <div className="gsHomeQuickConnectMainBox">
      <div className="gsHomeQuickConnectLeftBox">
        <h2>Quick contact</h2>
        <h4>Call / Whatsapp :</h4>
        <p>+91 8447562781 / +91 8806880990</p>
      </div>
      <div className="gsHomeQuickConnectRightBox">
        <h2>Register For Live Demo</h2>
        <form>
          <input placeholder="Your name" type="text" />
          <input placeholder="Your email" type="text" />
          <input placeholder="Your phone" type="text" />
          <input placeholder="City" type="text" />
          <button type="button">Send Message</button>
        </form>
      </div>
    </div>
  );
}
