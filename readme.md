# Electron-renderer-terminal
---
## Why & for what ?

I was created node application server and have plan to let another people to manage this server then electron app was created for an easy on next administrator. One of issue, how to let new guy to check error like access terminal ... it have some node module have ability to stream data base on socket.io but electron already have ipc to communicate between main and renderer process then solution to serve this requirement was create from **ipc** and **inferno** ( **Inferno** is an insanely fast, React-like library for building high-performance user interfaces on both the client and server ) and result of this merge was this module.

## Install

    npm install --save electron-renderer-terminal

## Usage

root/main.js

    const {app, BrowserWindow, ipcMain} = require('electron');
    *
    *
    *
    ipcMain.on('ChanelName', (e, arg) => {
        .
        .
        .
        ==================================

        you need to set some method to stream data to renderer
        may used pipe / setInterval / watch with tail

        ChanelName => you can assign any but it need to match with renderer process that was defined in this plugin 

        e => event will automate create by this plugin when will was called

        arg => was predife as "ping"

        ==================================
    });

root/view/src/render.js

    const { console_log }  = require('electron-renderer-terminal');

    console_log('ChanelName','app','console','line', 10 );

    ======================================

    That's it, it was 2 lines of coding to let it work in render.js detail as below

    ChanelName (string) => need to be same that call from main.js
    
    app (string) => DOM id <div id="app"></div> this element need to be coding in your index.html
    
    console (string ) => vDOM className (this DOM will automate create) 
    
    line ( string ) => vDOM className and this element will stroe message from Main process

    10 => this is number of line that we would like to have in our console

        Final result as below

        <div id="app">
            <div class="console">
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
                .
                .
                // until number of line that we was defined in next arg
            </div>
        </div>

    ==================================

root/view/index.html

    <!DOCTYPE html>
    <html lang="en">
        <head>
            <title>IPC & Inferno App</title>
            <link href="view/src/css.index.css" rel="stylesheet">
            .
            .
            .
        </head>
        <body>
            .
            .
            <div id="app"></div>
            .
            .
            <script src="view/src/render.js"></script>
        </body>
    </html>
    
    ==============================
    just two line of coding 
        
