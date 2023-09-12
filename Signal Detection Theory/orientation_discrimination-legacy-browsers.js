/*********************************** 
 * Orientation_Discrimination Test *
 ***********************************/


// store info about the experiment session:
let expName = 'orientation_discrimination';  // from the Builder filename that created this script
let expInfo = {
    'participant': `${util.pad(Number.parseFloat(util.randint(0, 999999)).toFixed(0), 6)}`,
    'session': '001',
};

// Start code blocks for 'Before Experiment'
// Run 'Before Experiment' code from code
hit = 0;
miss = 0;
correct_rejection = 0;
false_alarm = 0;

// init psychoJS:
const psychoJS = new PsychoJS({
  debug: true
});

// open window:
psychoJS.openWindow({
  fullscr: true,
  color: new util.Color([0,0,0]),
  units: 'height',
  waitBlanking: true
});
// schedule the experiment:
psychoJS.schedule(psychoJS.gui.DlgFromDict({
  dictionary: expInfo,
  title: expName
}));

const flowScheduler = new Scheduler(psychoJS);
const dialogCancelScheduler = new Scheduler(psychoJS);
psychoJS.scheduleCondition(function() { return (psychoJS.gui.dialogComponent.button === 'OK'); }, flowScheduler, dialogCancelScheduler);

// flowScheduler gets run if the participants presses OK
flowScheduler.add(updateInfo); // add timeStamp
flowScheduler.add(experimentInit);
const trialsLoopScheduler = new Scheduler(psychoJS);
flowScheduler.add(trialsLoopBegin(trialsLoopScheduler));
flowScheduler.add(trialsLoopScheduler);
flowScheduler.add(trialsLoopEnd);
flowScheduler.add(quitPsychoJS, '', true);

// quit if user presses Cancel in dialog box:
dialogCancelScheduler.add(quitPsychoJS, '', false);

psychoJS.start({
  expName: expName,
  expInfo: expInfo,
  resources: [
    // resources:
  ]
});

psychoJS.experimentLogger.setLevel(core.Logger.ServerLevel.EXP);

async function updateInfo() {
  currentLoop = psychoJS.experiment;  // right now there are no loops
  expInfo['date'] = util.MonotonicClock.getDateStr();  // add a simple timestamp
  expInfo['expName'] = expName;
  expInfo['psychopyVersion'] = '2023.1.3';
  expInfo['OS'] = window.navigator.platform;


  // store frame rate of monitor if we can measure it successfully
  expInfo['frameRate'] = psychoJS.window.getActualFrameRate();
  if (typeof expInfo['frameRate'] !== 'undefined')
    frameDur = 1.0 / Math.round(expInfo['frameRate']);
  else
    frameDur = 1.0 / 60.0; // couldn't get a reliable measure so guess

  // add info from the URL:
  util.addInfoFromUrl(expInfo);
  

  
  psychoJS.experiment.dataFileName = (("." + "/") + `data/${expInfo["participant"]}_${expName}_${expInfo["date"]}`);


  return Scheduler.Event.NEXT;
}

async function experimentInit() {
  // Initialize components for Routine "trial"
  trialClock = new util.Clock();
  fixation = new visual.ShapeStim ({
    win: psychoJS.window, name: 'fixation', 
    vertices: [[-[0.1, 0.1][0]/2.0, -[0.1, 0.1][1]/2.0], [+[0.1, 0.1][0]/2.0, -[0.1, 0.1][1]/2.0], [0, [0.1, 0.1][1]/2.0]],
    ori: 0.0, pos: [0, 0],
    anchor: 'center',
    lineWidth: 1.0, 
    colorSpace: 'rgb',
    lineColor: new util.Color('white'),
    fillColor: new util.Color('white'),
    opacity: undefined, depth: -1, interpolate: true,
  });
  
  grating = new visual.GratingStim({
    win : psychoJS.window,
    name : 'grating', units : undefined, 
    tex : undefined, mask : 'gauss',
    ori : 1.0, pos : [0, 0],
    anchor : 'center',
    sf : 5.0, phase : 0.0,
    size : [0.3, 0.3],
    color : new util.Color([1,1,1]), opacity : undefined,
    contrast : 0.3, blendmode : 'avg',
    texRes : 128.0, interpolate : true, depth : -2.0 
  });
  response_key = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Create some handy timers
  globalClock = new util.Clock();  // to track the time since experiment started
  routineTimer = new util.CountdownTimer();  // to track time remaining of each (non-slip) routine
  
  return Scheduler.Event.NEXT;
}

function trialsLoopBegin(trialsLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    trials = new TrialHandler({
      psychoJS: psychoJS,
      nReps: 10, method: TrialHandler.Method.RANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 'trials'
    });
    psychoJS.experiment.addLoop(trials); // add the loop to the experiment
    currentLoop = trials;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    trials.forEach(function() {
      snapshot = trials.getSnapshot();
    
      trialsLoopScheduler.add(importConditions(snapshot));
      trialsLoopScheduler.add(trialRoutineBegin(snapshot));
      trialsLoopScheduler.add(trialRoutineEachFrame());
      trialsLoopScheduler.add(trialRoutineEnd(snapshot));
      trialsLoopScheduler.add(trialsLoopEndIteration(trialsLoopScheduler, snapshot));
    });
    
    return Scheduler.Event.NEXT;
  }
}

async function trialsLoopEnd() {
  // terminate loop
  psychoJS.experiment.removeLoop(trials);
  // update the current loop from the ExperimentHandler
  if (psychoJS.experiment._unfinishedLoops.length>0)
    currentLoop = psychoJS.experiment._unfinishedLoops.at(-1);
  else
    currentLoop = psychoJS.experiment;  // so we use addData from the experiment
  return Scheduler.Event.NEXT;
}

function trialsLoopEndIteration(scheduler, snapshot) {
  // ------Prepare for next entry------
  return async function () {
    if (typeof snapshot !== 'undefined') {
      // ------Check if user ended loop early------
      if (snapshot.finished) {
        // Check for and save orphaned data
        if (psychoJS.experiment.isEntryEmpty()) {
          psychoJS.experiment.nextEntry(snapshot);
        }
        scheduler.stop();
      } else {
        psychoJS.experiment.nextEntry(snapshot);
      }
    return Scheduler.Event.NEXT;
    }
  };
}

function trialRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'trial' ---
    t = 0;
    trialClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    // Run 'Begin Routine' code from code
    import {choice} from 'random';
    function _pj_snippets(container) {
        function in_es6(left, right) {
            if (((right instanceof Array) || ((typeof right) === "string"))) {
                return (right.indexOf(left) > (- 1));
            } else {
                if (((right instanceof Map) || (right instanceof Set) || (right instanceof WeakMap) || (right instanceof WeakSet))) {
                    return right.has(left);
                } else {
                    return (left in right);
                }
            }
        }
        container["in_es6"] = in_es6;
        return container;
    }
    _pj = {};
    _pj_snippets(_pj);
    response = response_key.keys;
    if ((Math.random() < (1 / 2))) {
        tilt = 0;
        correct_response = "up";
        if ((response === "up")) {
            psychoJS.experiment.addData("condition", "hit");
            hit = (hit + 1);
        } else {
            if ((response === "down")) {
                psychoJS.experiment.addData("condition", "miss");
                miss = (miss + 1);
            } else {
                psychoJS.experiment.addData("condition", "other condition");
                console.log("something wrong happened");
            }
        }
    } else {
        tilt = Number.parseInt(choice(function () {
        var _pj_a = [], _pj_b = util.range((- 5), 5);
        for (var _pj_c = 0, _pj_d = _pj_b.length; (_pj_c < _pj_d); _pj_c += 1) {
            var i = _pj_b[_pj_c];
            if ((! _pj.in_es6(i, [0]))) {
                _pj_a.push(i);
            }
        }
        return _pj_a;
    }
    .call(this)));
        correct_response = "down";
        if ((response === "down")) {
            psychoJS.experiment.addData("condition", "correct rejection");
            correct_rejection = (correct_rejection + 1);
        } else {
            if ((response === "up")) {
                psychoJS.experiment.addData("condition", "false alarm");
                false_alarm = (false_alarm + 1);
            } else {
                psychoJS.experiment.addData("condition", "other");
                console.log("something wrong happened");
            }
        }
    }
    trials.addData("tilt", tilt);
    psychoJS.experiment.addData("user response", response);
    
    grating.setOri(tilt);
    response_key.keys = undefined;
    response_key.rt = undefined;
    _response_key_allKeys = [];
    // keep track of which components have finished
    trialComponents = [];
    trialComponents.push(fixation);
    trialComponents.push(grating);
    trialComponents.push(response_key);
    
    trialComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}

function trialRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'trial' ---
    // get current time
    t = trialClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *fixation* updates
    if (t >= 0.0 && fixation.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      fixation.tStart = t;  // (not accounting for frame time here)
      fixation.frameNStart = frameN;  // exact frame index
      
      fixation.setAutoDraw(true);
    }

    frameRemains = 0.0 + 1.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (fixation.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      fixation.setAutoDraw(false);
    }
    
    // *grating* updates
    if (t >= 1.0 && grating.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      grating.tStart = t;  // (not accounting for frame time here)
      grating.frameNStart = frameN;  // exact frame index
      
      grating.setAutoDraw(true);
    }

    frameRemains = 1.0 + 0.3 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (grating.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      grating.setAutoDraw(false);
    }
    
    // *response_key* updates
    if (t >= 1.0 && response_key.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      response_key.tStart = t;  // (not accounting for frame time here)
      response_key.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      response_key.clock.reset();
      response_key.start();
      response_key.clearEvents();
    }

    if (response_key.status === PsychoJS.Status.STARTED) {
      let theseKeys = response_key.getKeys({keyList: ['up', 'down'], waitRelease: false});
      _response_key_allKeys = _response_key_allKeys.concat(theseKeys);
      if (_response_key_allKeys.length > 0) {
        response_key.keys = _response_key_allKeys[_response_key_allKeys.length - 1].name;  // just the last key pressed
        response_key.rt = _response_key_allKeys[_response_key_allKeys.length - 1].rt;
        response_key.duration = _response_key_allKeys[_response_key_allKeys.length - 1].duration;
        // was this correct?
        if (response_key.keys == correct_response) {
            response_key.corr = 1;
        } else {
            response_key.corr = 0;
        }
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    trialComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}

function trialRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'trial' ---
    trialComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    // was no response the correct answer?!
    if (response_key.keys === undefined) {
      if (['None','none',undefined].includes(correct_response)) {
         response_key.corr = 1;  // correct non-response
      } else {
         response_key.corr = 0;  // failed to respond (incorrectly)
      }
    }
    // store data for current loop
    // update the trial handler
    if (currentLoop instanceof MultiStairHandler) {
      currentLoop.addResponse(response_key.corr, level);
    }
    psychoJS.experiment.addData('response_key.keys', response_key.keys);
    psychoJS.experiment.addData('response_key.corr', response_key.corr);
    if (typeof response_key.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('response_key.rt', response_key.rt);
        psychoJS.experiment.addData('response_key.duration', response_key.duration);
        routineTimer.reset();
        }
    
    response_key.stop();
    // the Routine "trial" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}

function importConditions(currentLoop) {
  return async function () {
    psychoJS.importAttributes(currentLoop.getCurrentTrial());
    return Scheduler.Event.NEXT;
    };
}

async function quitPsychoJS(message, isCompleted) {
  // Check for and save orphaned data
  if (psychoJS.experiment.isEntryEmpty()) {
    psychoJS.experiment.nextEntry();
  }
  
  // Run 'End Experiment' code from code
  psychoJS.experiment.addData("hit", hit);
  psychoJS.experiment.addData("miss", miss);
  psychoJS.experiment.addData("correct rejection", correct_rejection);
  psychoJS.experiment.addData("flase alarm", false_alarm);
  
  
  psychoJS.window.close();
  psychoJS.quit({message: message, isCompleted: isCompleted});
  
  return Scheduler.Event.QUIT;
}
