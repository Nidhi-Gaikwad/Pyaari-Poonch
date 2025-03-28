import { View, Text, Image, Pressable } from 'react-native';
import React, { useState, useCallback, useEffect } from 'react';
import Colors from './../../constants/Colors';
import * as WebBrowser from 'expo-web-browser';
import { useOAuth } from '@clerk/clerk-expo';
import * as Linking from 'expo-linking';

export const useWarmUpBrowser = () => {
  useEffect(() => {
    // Warm up the browser to improve UX
    WebBrowser.warmUpAsync();
    return () => {
      WebBrowser.coolDownAsync();
    };
  }, []);
};

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });
  const [loading, setLoading] = useState(false); // State to prevent multiple clicks

  const onPress = useCallback(async () => {
    if (loading) return; // Prevent multiple clicks
    setLoading(true); // Disable button during login process

    try {
      const { createdSessionId, setActive } = await startOAuthFlow({
        redirectUrl: Linking.createURL('/home'), // Fixed redirect URL
      });

      if (createdSessionId) {
        console.log("Session created, setting active...");
        await setActive({ session: createdSessionId });
        console.log("Session activated successfully!");
      } else {
        console.log("OAuth flow completed, but no session created.");
      }
    } catch (err) {
      console.error('OAuth error', err);
    } finally {
      setLoading(false); // Re-enable button after process
    }
  }, [loading]);

  return (
    <View style={{ backgroundColor: Colors.WHITE, height: '100%' }}>
      <Image 
        source={require('./../../assets/images/login.png')}
        style={{ width: '100%', height: 500 }}
      />
      
      <View style={{ padding: 20, display: 'flex', alignItems: 'center' }}>
        <Text style={{ fontFamily: 'outfit-bold', fontSize: 30, textAlign: 'center' }}>
          Ready to make a new friend?
        </Text>
        <Text style={{ fontFamily: 'outfit', fontSize: 18, textAlign: 'center', color: Colors.GRAY }}>
          Let's adopt the pet you like and make their life happy again.
        </Text>

        <Pressable
          onPress={onPress}
          disabled={loading} // Disable while loading
          style={{
            padding: 14,
            marginTop: 100,
            backgroundColor: loading ? Colors.GRAY : Colors.PRIMARY, // Gray out when loading
            width: '100%',
            borderRadius: 14,
            bottom: 100,
          }}
        >
          <Text style={{ fontFamily: 'outfit-medium', fontSize: 20, textAlign: 'center' }}>
            {loading ? "Loading..." : "Get Started"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
