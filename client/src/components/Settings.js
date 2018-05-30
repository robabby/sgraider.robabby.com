import React from 'react';

export default (props) => {
  return (
    <div>
      <h2>Settings</h2>
      <div style={{marginTop: 15}}>
        <a
          href="/auth/connect/discord"
          className={'login-submit'}
        >
          Connect with Discord
        </a>
      </div>
      <div style={{marginTop: 15}}>
        <a
          href="/auth/connect/bungie"
          className={'login-submit'}
        >
          Connect with Bungie
        </a>
      </div>
    </div>
  )
}
