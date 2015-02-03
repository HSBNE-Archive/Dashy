# HSBNE Dashboard

[![Join the chat at https://gitter.im/HSBNE/Dashy](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/HSBNE/Dashy?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

## Install

    cp config-dist.js config.js

The easyxml module, required by the xeno module, has changed significantly and now breaks the xeno module.  The following is a work around:

    npm install easyxml@0.1.0
    npm install


Aquire the Xero credentials from @jhogendorn. Update config.js with credentials.

    dashing-js start

## More reading

Check out https://github.com/fabiocaseri/dashing-js for more information.
