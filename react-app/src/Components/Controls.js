import React from 'react';

export function CenterControl(controlDiv, map, getLocationFn) {
  // Set CSS for the control border.
  var controlUI = document.createElement('div');
  controlUI.className = "CenterControl";
  controlUI.title = 'Click to recenter the map';
  controlDiv.appendChild(controlUI);

  // Set CSS for the control interior.
  var controlText = document.createElement('div');
  controlText.innerHTML = '<img src="https://cdn4.iconfinder.com/data/icons/social-communication/142/target-512.png" width=48px height=48px/>';
  controlUI.appendChild(controlText);

  // Setup the click event listeners: simply set the map to Chicago.
  controlUI.addEventListener('click', function() {
    getLocationFn().then((newPos) => map.setCenter({lat: newPos.coords.latitude, 
                                                  lng: newPos.coords.longitude})
    );
  });
}

export function TestButton(controlDiv, map, test_fn) {
  // Set CSS for the control border.
  var controlUI = document.createElement('div');
  controlUI.className = "CenterControl";
  controlUI.title = 'Test Feature';
  controlDiv.appendChild(controlUI);

  // Set CSS for the control interior.
  var controlText = document.createElement('div');
  controlText.innerHTML = 'Test Feature';
  controlUI.appendChild(controlText);

  // Setup the click event listeners: simply set the map to Chicago.
  controlUI.addEventListener('click', function() {
    test_fn();
  });
}

export function BarkControl(controlDiv, map, updateBarkDialog) {
  // Set CSS for the control border.
  var controlUI = document.createElement('div');
  controlUI.className = "BarkControl";
  controlUI.title = 'Make a bark';
  controlDiv.appendChild(controlUI);

  // Set CSS for the control interior.
  var controlText = document.createElement('div');
  controlText.innerHTML = 'Bark!';
  controlUI.appendChild(controlText);

  // Setup the click event listeners: simply set the map to Chicago.
  controlUI.addEventListener('click', function() {
    updateBarkDialog(true);
  });
}

export default { CenterControl, TestButton, BarkControl }