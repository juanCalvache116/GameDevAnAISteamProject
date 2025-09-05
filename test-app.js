/**
 * Quick test script to verify Drowned Heart Electron app functionality
 * Run this after starting the app to check basic functionality
 */

console.log('🌊 Drowned Heart - App Test Started ⚓');

// Test 1: Check if we're running in Electron
if (typeof require !== 'undefined') {
    try {
        const { remote } = require('electron');
        console.log('✅ Running in Electron environment');
    } catch (e) {
        console.log('ℹ️  Electron environment detected (newer version)');
    }
} else {
    console.log('❌ Not running in Electron - this should be run inside the app');
}

// Test 2: Check asset loading
function testAssetLoading() {
    console.log('\n📁 Testing Asset Loading...');
    
    // Test logo loading
    const logo = document.querySelector('.splash-logo');
    if (logo) {
        logo.onload = () => console.log('✅ Splash logo loaded successfully');
        logo.onerror = () => console.log('❌ Splash logo failed to load');
        
        if (logo.complete && logo.naturalWidth > 0) {
            console.log('✅ Splash logo already loaded');
        }
    }
    
    // Test main menu logo
    const mainLogo = document.querySelector('.main-logo');
    if (mainLogo) {
        mainLogo.onload = () => console.log('✅ Main menu logo loaded successfully');
        mainLogo.onerror = () => console.log('❌ Main menu logo failed to load');
        
        if (mainLogo.complete && mainLogo.naturalWidth > 0) {
            console.log('✅ Main menu logo already loaded');
        }
    }
    
    // Test audio
    const audio = document.getElementById('menuMusic');
    if (audio) {
        audio.oncanplay = () => console.log('✅ Menu music can play');
        audio.onerror = () => console.log('❌ Menu music failed to load');
        
        if (audio.readyState >= 3) {
            console.log('✅ Menu music already ready');
        }
    }
}

// Test 3: Check WebGL support
function testWebGL() {
    console.log('\n🎮 Testing WebGL Support...');
    
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    
    if (gl) {
        console.log('✅ WebGL is supported');
        console.log(`   Renderer: ${gl.getParameter(gl.RENDERER)}`);
        console.log(`   Vendor: ${gl.getParameter(gl.VENDOR)}`);
        console.log(`   Version: ${gl.getParameter(gl.VERSION)}`);
    } else {
        console.log('❌ WebGL is not supported');
    }
}

// Test 4: Check game state transitions
function testGameStates() {
    console.log('\n🎯 Testing Game State Management...');
    
    // Check if gameState variable exists
    if (typeof gameState !== 'undefined') {
        console.log(`✅ Current game state: ${gameState}`);
    } else {
        console.log('❌ Game state variable not accessible');
    }
    
    // Check if key functions exist
    const functions = ['transitionToMainMenu', 'startGame', 'backToMenu'];
    functions.forEach(funcName => {
        if (typeof window[funcName] === 'function') {
            console.log(`✅ Function ${funcName} is available`);
        } else {
            console.log(`❌ Function ${funcName} is missing`);
        }
    });
}

// Test 5: Performance monitoring
function testPerformance() {
    console.log('\n⚡ Performance Check...');
    
    if (performance && performance.now) {
        const startTime = performance.now();
        
        // Simulate some work
        for (let i = 0; i < 100000; i++) {
            Math.random();
        }
        
        const endTime = performance.now();
        console.log(`✅ Performance API working - Test took ${(endTime - startTime).toFixed(2)}ms`);
    } else {
        console.log('❌ Performance API not available');
    }
}

// Run all tests
function runAllTests() {
    console.log('🧪 Running Drowned Heart App Tests...\n');
    
    testAssetLoading();
    testWebGL();
    testGameStates();
    testPerformance();
    
    console.log('\n🏁 Test Complete! Check console for any ❌ errors above.');
    console.log('If you see this message, the basic app structure is working! 🎉');
}

// Auto-run tests when script loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runAllTests);
} else {
    runAllTests();
}

// Export for manual testing
window.testDrownedHeart = {
    runAllTests,
    testAssetLoading,
    testWebGL,
    testGameStates,
    testPerformance
};
