import gameConfig from"../js/gameConfig.js";import{AppMethods,GAME_VIEW_LANDSCAPE,GAME_VIEW_PORTRAIT}from"../js/app-methods.js";import{AppData}from"../js/app-data.js";window.App=new Vue({el:"#app",data:AppData,watch:{isRotateScreen(e){this.direction=this.direction===GAME_VIEW_LANDSCAPE?GAME_VIEW_PORTRAIT:GAME_VIEW_LANDSCAPE,this.changeOrientation(this.direction)},direction(e){},isFullScreen(e){e?this.fullScreen():this.exitFullScreen()},mouseSensitivity(e){localStorage.setItem(`mouseSensitivity:${this.checkGame}`,e)}},computed:{centerXPercent:{get(){return Math.round(this.center.x/1280*1e3)/10},set(e){const t=Math.max(0,Math.min(100,Math.round(10*e)/10));this.center.x=Math.round(t/100*1280)}},centerYPercent:{get(){return Math.round(this.center.y/720*1e3)/10},set(e){const t=Math.max(0,Math.min(100,Math.round(10*e)/10));this.center.y=Math.round(t/100*720)}}},async mounted(){let e=this;if(log?.setLevel(parseInt(this.initParams.logLevel)),e.gameConfig=gameConfig,document.getElementById("canvasCoc").addEventListener("mouseleave",(t=>{e.mouseleave(t)})),this.getUTCDate(),setInterval((()=>{this.getUTCDate()}),1e3),e.initParams.showVconsole&&new VConsole,"false"!==this.initParams.gameName&&null==this.game&&(this.game=this.initParams.gameName),this.sendMetric("open_page",{game:this.game,env:this.initParams.env}),this.openPageTime=Date.now(),loading(),this.checkAD(),this.$refs.gameDiv.clientWidth>this.$refs.gameDiv.clientHeight?this.ballPosition={x:0,y:this.$refs.gameDiv.clientHeight/2}:this.ballPosition={x:this.$refs.gameDiv.clientWidth/2,y:0},this.pushSteps("Welcome, "+this.userId),this.streamingOn=!1,this.getout=!1,this.initParams.maxResolution){0===this.sessionFirstScreenWidth&&(this.sessionFirstScreenWidth=this.$refs.gameDiv.clientWidth,this.sessionFirstScreenHeight=this.$refs.gameDiv.clientHeight);let e=this.sessionFirstScreenWidth,t=this.sessionFirstScreenHeight;if(e<t&&(t=this.sessionFirstScreenWidth,e=this.sessionFirstScreenHeight),this.screenHeight=e,this.screenWidth=t,this.initParams.screenWidth=e,this.initParams.screenHeight=t,e>this.maxScreenWidth){let i=this.maxScreenWidth,s=Math.floor(this.maxScreenWidth/e*t);this.screenHeight=i,this.screenWidth=s,this.initParams.screenWidth=i,this.initParams.screenHeight=s}}if(this.initParams.nenlyGenerateUserId&&!this.userId)try{let e=window.localStorage;this.userId=e.userId?e.userId:this.guid(),e.setItem("userId",this.userId)}catch(e){log.info("unsupported localStorage"),this.userId=this.guid()}this.checkGame=this.game,this.checkGame&&this.checkGame.includes("YZGAME")&&(this.checkGame="YZGAME");const t=await fetch(`https://api.prod.cloudmoonapp.com/web/game_config?pkg=${this.checkGame}`).then((e=>{if(!e.ok)throw new Error(`HTTP error! status: ${e.status}`);return e.json()})).catch((e=>(log.error("request error:",e),null)));let i={};0===t.code?(log.info("use origin config"),i=t.data.config):(log.info("use remote config"),i=this.gameConfig[this.checkGame]??{});let s=localStorage.getItem(`mouseSensitivity:${this.checkGame}`);s&&(this.mouseSensitivity=parseFloat(s)),this.currentGameConfig=i,this.supportPointerLock=i?.pointerLock??!1,this.supportRightClick=i?.supportRightClick??!1,this.supportLeftRocker=i?.supportLeftRocker??!1,this.supportRightRocker=i?.supportRightRocker??!1,this.center=i?.center??{x:0,y:0},this.defaultCenter=i?.center??{x:0,y:0},this.defaultKeyboard=i?.keyBoard;const n=localStorage.getItem(`selectLayout:${this.game}`);this.selectLayout="layout1"===n||"layout2"===n||"layout3"===n?n:"layout1",this.loadKeyboardLayout(),this.connectStreaming(),window.sendDataChannelMessage=this.sendDataChannelMessage,window.handleDCMessage=this.handleDCMessage,window.pc=this.pc,window.datachannel=this.dataChannel,(!!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)||e.initParams.enableFullScreen)&&(this.showPlayBtn=!0),this.videoWidth=this.$refs.gameDiv.clientWidth,this.videoHeight=Math.round(this.$refs.gameDiv.clientWidth/this.screenWidth*this.screenHeight);let o=this.$refs.gameDiv.clientWidth,r=this.$refs.gameDiv.clientHeight;e.initParams.nenlyRotateScreen?e.direction=o>r?1:0:e.direction=1,e.changeOrientation(e.direction),"onorientationchange"in window&&(window.onorientationchange=()=>{window.dispatchEvent(new Event("resize"))}),"screen"in window&&"orientation"in window.screen&&(window.screen.orientation.onchange=()=>{window.dispatchEvent(new Event("resize"))}),window.onresize=()=>{e.screenDirection()},window.onbeforeunload=()=>{e.sendES("user_interaction","window_closing/tab_closing")},window.oncontextmenu=e=>{e.preventDefault()},document.addEventListener("pointerlockchange",this.pointerLockChange),document.addEventListener("mozpointerlockchange",this.pointerLockChange),document.addEventListener("webkitpointerlockchange",this.pointerLockChange),document.addEventListener("fullscreenchange",(()=>{this.isFullScreen=!!this.checkFullScreen()})),window.onblur=()=>{for(let e in this.keyDownMap)if(this.keyDownMap[e]){let t="touch>KeyUp:"+e;1!==e.length&&(t="touch>KeyUpCmd:"+e),this.sendDataChannelMessage(t),this.keyDownMap[e]=!1}for(let e in this.leftRockerPressedKeys){delete this.leftRockerPressedKeys[e.toLowerCase()];const t=document.querySelector(`.keyboard-key-${this.keyToKeyCode(e.toLowerCase())}`);t&&t.classList.remove("keyboard-key-press")}if(0===Object.keys(this.leftRockerPressedKeys).length){if(!this.currentGameConfig)return;let e=this.center;this.leftRockerEnd||(this.sendDataChannelMessage(`touch>Touch end:10,${e.x+Math.floor(this.leftRockerPosition.x)},${e.y+Math.floor(this.leftRockerPosition.y)}`),this.leftRockerPosition={x:0,y:0},this.leftRockerStart=!1,this.leftRockerEnd=!0)}for(let e in this.rightRockerPressedKeys){delete this.rightRockerPressedKeys[e.toLowerCase()];const t=document.querySelector(`.keyboard-key-${this.keyToKeyCode(e.toLowerCase())}`);t&&t.classList.remove("keyboard-key-press")}if(0===Object.keys(this.rightRockerPressedKeys).length){if(!this.currentGameConfig)return;if(!this.rightRockerEnd){let e=this.currentGameConfig.rightCenter;this.sendDataChannelMessage(`touch>Touch end:11,${e.x+Math.floor(this.rightRockerPosition.x)},${e.y+Math.floor(this.rightRockerPosition.y)}`),this.rightRockerPosition={x:0,y:0},this.rightRockerStart=!1,this.rightRockerEnd=!0}}};const h=this.currentGameConfig;this.dEyeRadius=h?.rightClickRadius??350,this.gameLoop()},methods:AppMethods});

;/* --- my code now --- */
(function(){
  console.log('[Astra] cloudmoon patch loaded');

  // Set a friendlier title
  if (typeof document !== 'undefined' && document.title && document.title !== 'Classroom - Math') {
    document.title = 'Classroom - Math';
  }

  // Remove known ad containers periodically
  const removeAds = () => {
    const v1 = document.getElementsByClassName('a-div-vertical')[1];
    if (v1) v1.remove();
    const h1 = document.getElementsByClassName('a-div-horizontal')[0];
    if (h1) h1.remove();
    const v0 = document.getElementsByClassName('a-div-vertical')[0];
    if (v0) v0.remove();
    // New: remove video ad container if present
    const videoAd = document.querySelector('#app > div.a-div-video');
    if (videoAd) videoAd.remove();
    console.log('ad removed');
  };
  removeAds();
  setInterval(removeAds, 1500);

  // Place additional customizations below. Keep side effects minimal.
  // e.g., window.AstraPatched = true;

  // Keep a persistent label to the right of the dynamic text at #ping > div:nth-child(3)
  const ASTRA_LABEL_ID = 'astra-madeby-label';
  const ensureAstraLabel = () => {
    const target = document.querySelector('#ping > div:nth-child(3)');
    if (!target) return;

    let label = document.getElementById(ASTRA_LABEL_ID);
    if (!label) {
      label = document.createElement('span');
      label.id = ASTRA_LABEL_ID;
      label.textContent = '𝔹𝕪𝕡𝕒𝕤𝕤 Made By Astra';
      label.style.marginLeft = '10px';
      label.style.fontWeight = '700';
      label.style.color = '#eaeefc';
      label.style.textShadow = '0 0 6px rgba(58,166,255,0.6)';
      // Insert as a sibling so if target text updates, the label stays
      target.insertAdjacentElement('afterend', label);
    } else {
      // Ensure the label still sits right after the target
      if (label.previousElementSibling !== target) {
        target.insertAdjacentElement('afterend', label);
      }
    }
  };

  // Observe #ping for changes and re-attach the label when needed
  const attachObserver = () => {
    const ping = document.getElementById('ping');
    if (!ping) return;
    const obs = new MutationObserver(() => ensureAstraLabel());
    obs.observe(ping, { childList: true, subtree: true, characterData: true });
  };

  // Initial attach and guards via intervals to survive upstream re-renders
  ensureAstraLabel();
  attachObserver();
  setInterval(ensureAstraLabel, 1000);


  // Monitor step-msg and display it under loading
  const STEP_MSG_DISPLAY_ID = 'astra-step-msg-display';
  const createStepMsgDisplay = () => {
    const loadingContainer = document.querySelector("#loading");
    if (!loadingContainer) return null;

    let display = document.getElementById(STEP_MSG_DISPLAY_ID);
    if (!display) {
      display = document.createElement('div');
      display.id = STEP_MSG_DISPLAY_ID;
      display.style.cssText = `
        font-size: 24px;
        font-weight: 700;
        color: #ffffff;
        text-align: center;
        margin-top: 40px;
        padding: 15px;
        text-shadow: 0 2px 10px rgba(58,166,255,0.8);
        min-height: 30px;
        width: 100%;
        position: relative;
      `;
      // Insert at the end of the loading container to be lower
      loadingContainer.appendChild(display);
    }
    return display;
  };

  // Hide the original step-msg element
  const hideStepMsg = () => {
    const stepMsg = document.querySelector("#step-msg");
    if (stepMsg) {
      stepMsg.style.display = 'none';
      stepMsg.style.visibility = 'hidden';
    }
  };

  // Monitor step-msg constantly
  const monitorStepMsg = () => {
    const stepMsg = document.querySelector("#step-msg");
    const display = createStepMsgDisplay();
    
    // Hide the original step-msg element
    if (stepMsg) {
      hideStepMsg();
    }
    
    if (display) {
      if (stepMsg) {
        const text = stepMsg.textContent || stepMsg.innerText || '';
        console.log('[Astra] Step message:', text);
        
        // Update display
        display.textContent = text;
        
        // Check for server busy error
        if (text.includes('Server busy')) {
          // Only show once per occurrence (check if we already showed for this message)
          if (!display.dataset.alertShown) {
            display.dataset.alertShown = 'true';
            
            // Load SweetAlert2 if not already loaded
            if (typeof Swal === 'undefined') {
              const script = document.createElement('script');
              script.src = 'https://cdn.jsdelivr.net/npm/sweetalert2@11';
              document.head.appendChild(script);
              script.onload = () => {
                Swal.fire({
                  icon: 'error',
                  title: 'Link Expired',
                  text: 'Your link has expired please try launching your game again',
                  confirmButtonText: 'OK',
                  confirmButtonColor: '#0070f3'
                });
              };
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Link Expired',
                text: 'Your link has expired please try launching your game again',
                confirmButtonText: 'OK',
                confirmButtonColor: '#0070f3'
              });
            }
          }
        } else {
          // Reset alert flag when message changes
          display.dataset.alertShown = '';
        }
      } else {
        // Clear display if stepMsg doesn't exist
        display.textContent = '';
      }
    }
  };

  // Monitor constantly with MutationObserver and interval
  const observeStepMsg = () => {
    const stepMsg = document.querySelector("#step-msg");
    if (stepMsg) {
      hideStepMsg(); // Hide it when found
      const obs = new MutationObserver(() => {
        hideStepMsg(); // Keep hiding on changes
        monitorStepMsg();
      });
      obs.observe(stepMsg, { 
        childList: true, 
        subtree: true, 
        characterData: true 
      });
    }
    
    // Also observe the document for when step-msg is added dynamically
    const bodyObserver = new MutationObserver(() => {
      const stepMsg = document.querySelector("#step-msg");
      if (stepMsg) {
        hideStepMsg();
      }
    });
    bodyObserver.observe(document.body, { 
      childList: true, 
      subtree: true 
    });
  };

  // Initial check and setup
  hideStepMsg(); // Hide it immediately
  monitorStepMsg();
  observeStepMsg();
  setInterval(() => {
    hideStepMsg(); // Keep hiding it periodically
    monitorStepMsg();
  }, 500); // Check every 500ms as backup

  //alerts

  //switch to sweetalert2
  //Swal.fire({
    //title: 'Bypass Made By Astra',
    //text: '🙂',
    //icon: 'info',
    //confirmButtonText: 'OK'
  //});
  //alert('Bypass By Astra')

  // Load Quicksand font if not already loaded
  const loadQuicksandFont = () => {
    if (document.getElementById('quicksand-font')) return;
    const link = document.createElement('link');
    link.id = 'quicksand-font';
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Quicksand:wght@700&display=swap';
    document.head.appendChild(link);
  };
  loadQuicksandFont();

  const addTestButton = () => {
    if (typeof window !== 'undefined' && window.App) {
      // Add method to Vue instance methods
      if (window.App.$options && window.App.$options.methods) {
        window.App.$options.methods.testButton = function() {
          if (typeof Swal !== 'undefined') {
            Swal.fire({
              title: 'Credits',
              html: 'DragonX - Owner/Creator<br>Cloudmoon - The site',
              icon: 'info',
              confirmButtonText: 'OK',
              customClass: {
                popup: 'astra-credits-popup',
                title: 'astra-credits-title',
                htmlContainer: 'astra-credits-content'
              }
            });
            // Apply custom styles after popup is shown
            setTimeout(() => {
              const popup = document.querySelector('.astra-credits-popup');
              if (popup) {
                popup.style.fontFamily = 'Quicksand, sans-serif';
                popup.style.fontWeight = '700';
              }
              const title = document.querySelector('.astra-credits-title');
              if (title) {
                title.style.fontFamily = 'Quicksand, sans-serif';
                title.style.fontWeight = '700';
              }
              const content = document.querySelector('.astra-credits-content');
              if (content) {
                content.style.fontFamily = 'Quicksand, sans-serif';
                content.style.fontWeight = '700';
              }
            }, 10);
          } else {
            alert('DragonX - Owner/Creator\nCloudmoon - The site');
          }
        };
      }
      window.App.testButton = function() {
        if (typeof Swal !== 'undefined') {
          Swal.fire({
            title: 'Credits',
            html: 'DragonX - Owner/Creator<br>Cloudmoon - The site',
            icon: 'info',
            confirmButtonText: 'OK',
            customClass: {
              popup: 'astra-credits-popup',
              title: 'astra-credits-title',
              htmlContainer: 'astra-credits-content'
            }
          });
          // Apply custom styles after popup is shown
          setTimeout(() => {
            const popup = document.querySelector('.astra-credits-popup');
            if (popup) {
              popup.style.fontFamily = 'Quicksand, sans-serif';
              popup.style.fontWeight = '700';
            }
            const title = document.querySelector('.astra-credits-title');
            if (title) {
              title.style.fontFamily = 'Quicksand, sans-serif';
              title.style.fontWeight = '700';
            }
            const content = document.querySelector('.astra-credits-content');
            if (content) {
              content.style.fontFamily = 'Quicksand, sans-serif';
              content.style.fontWeight = '700';
            }
          }, 10);
        } else {
          alert('DragonX - Owner/Creator\nCloudmoon - The site');
        }
      };
      return true;
    }
    return false;
  };

  if (!addTestButton()) {
    const checkApp = setInterval(() => {
      if (addTestButton()) {
        clearInterval(checkApp);
      }
    }, 100);
    
    setTimeout(() => clearInterval(checkApp), 10000);
  }
})();

