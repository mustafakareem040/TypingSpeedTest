import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {View, Text, StyleSheet, Pressable, TextInput, useWindowDimensions} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const keys = [
  ['escape', 'f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7', 'f8', 'f9', 'f10', 'f11', 'f12'],
  ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'backspace'],
  ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='],
  ['tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
  ['capslock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', 'enter'],
  ['shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', ':'],
  ['control', 'alt', ' ', 'arrowleft', 'arrowup', 'arrowdown', 'arrowright']
];

const allowedKeys = new Set([
  '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+',
  '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=',
  'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\',
  'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', 'z', 'x', 'c',
  'v', 'b', 'n', 'm', ',', '.', ':', ' ', 'enter', 'backspace'
]);

const keyToIcon = {
  'escape': 'keyboard-esc',
  'tab': 'keyboard-tab',
  'capslock': 'keyboard-caps',
  'shift': 'apple-keyboard-shift',
  'control': 'apple-keyboard-command',
  'enter': 'keyboard-return',
  ' ': 'keyboard-space',
  'arrowleft': 'arrow-left',
  'arrowup': 'arrow-up',
  'arrowdown': 'arrow-down',
  'arrowright': 'arrow-right',
  'backspace': 'keyboard-backspace',
  'f1': 'keyboard-f1',
  'f2': 'keyboard-f2',
  'f3': 'keyboard-f3',
  'f4': 'keyboard-f4',
  'f5': 'keyboard-f5',
  'f6': 'keyboard-f6',
  'f7': 'keyboard-f7',
  'f8': 'keyboard-f8',
  'f9': 'keyboard-f9',
  'f10': 'keyboard-f10',
  'f11': 'keyboard-f11',
  'f12': 'keyboard-f12',
};

const Keyboard = () => {
  const [focusedKeys, setFocusedKeys] = useState([]);
  const [isCapsLock, setIsCapsLock] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const {width} = useWindowDimensions();
  const styles = useMemo(() =>
    StyleSheet.create({
      container: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      input: {
        width: '90%',
        borderRadius: 5,
        backgroundColor: '#FFFFFF',
        color: '#000000',
        fontSize: width > 600 ? 18 : 'auto',
        marginBottom: 5,
        paddingHorizontal: 15,
        paddingVertical: 10,
        textAlign: 'center',
      },
      keyboard: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: '#191919',
      },
      row: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
      },
      key: {
        borderWidth: 1,
        borderRadius: 5,
        margin: 2,
        flexGrow: 1,
        paddingHorizontal: width > 900 ? 15 : width > 600 ? 8 : 2,
        paddingVertical: width > 900 ? 10 : width > 600 ? 3 : 0,
        backgroundColor: '#181818',
        justifyContent: 'center',
        alignItems: 'center',
        userSelect: 'none',
      },
      keyFocused: {
        backgroundColor: '#4A90E2',
      },
      keyHover: {
        backgroundColor: '#65adfa',
      },
      keyText: {
        fontSize: width > 600 ? 18 : 16,
        color: '#FFFFFF',
      },
      keySpace: {
        flexGrow: 20,
      },
      keyEnter: {
        flexGrow: 12,
      },
      keyTab: {
        flexGrow: 5
      },
      keyCapsLock: {
        flexGrow: 7
      },
      backSpace: {
        flexGrow: 10,
      },
      keyShift: {
        flexGrow: 5
      },
    }), [width])
  const handleKeyPress = useCallback(key => {
    let k = key.toLowerCase()
    if (k === 'capslock') {
      setIsCapsLock(prevIsCapsLock => !prevIsCapsLock);
      return
    }
    if (!allowedKeys.has(k)) return;
    if (k === 'enter') return;
    if (k === 'backspace') setInputValue((prev) => prev.slice(0, -1));
    else setInputValue((prev) => prev + key);
  }, []);

  const handleKeyDown = useCallback((e) => {
    const key = e.key.toLowerCase();
    const args = []
    if (key === 'capslock') {
      return
    }
    else if (e.getModifierState && e.getModifierState("CapsLock") !== isCapsLock) {
      let t = e.getModifierState("CapsLock")
      setIsCapsLock(t)
      if (t) args.push("capslock")
    }
    setFocusedKeys(prevKeys => [...new Set([...prevKeys, key, ...args])]);
    if (key !== 'capslock')
      handleKeyPress(e.key);
  }, [handleKeyPress, isCapsLock]);

  const handleKeyUp = useCallback((e) => {
    if (!e.key) return;
    const key = e.key.toLowerCase();
    if (key === 'capslock' && isCapsLock === false) {
      setIsCapsLock(!isCapsLock);
      setFocusedKeys(prevKeys => [...new Set([...prevKeys, key])]);
      return;
    }
    else if (key === 'capslock' && isCapsLock === true) {
      setIsCapsLock(!isCapsLock)
    }
    let i = keys[2].findIndex(it => it === key);
    if (i >= 0)
      setFocusedKeys(prevKeys => prevKeys.filter(k => {k !== key || k === keys[1][i]}))
    else setFocusedKeys(prevKeys => prevKeys.filter(k => k !== key))
  }, [isCapsLock]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  useEffect(() => {
    let interval;
    if (focusedKeys.includes('backspace')) {
      interval = setInterval(() => handleKeyPress('backspace'), 200);
    }
    return () => clearInterval(interval);
  }, [focusedKeys, handleKeyPress]);

  const renderKey = useCallback((key, rowIndex, keyIndex) => {
    const isFocused = focusedKeys.includes(key);
    const displayKey = isCapsLock && key.length === 1 ? key.toUpperCase() : key;
    return (
        <Pressable
            key={`${key}-${rowIndex}-${keyIndex}`}
            style={({ pressed, hovered }) => [
              styles.key,
              isFocused && styles.keyFocused,
              hovered && styles.keyHover,
              pressed && styles.keyFocused,
              key === ' ' && styles.keySpace,
              key === 'enter' && styles.keyEnter,
              key === 'tab' && styles.keyTab,
              key === 'capslock' && styles.keyCapsLock,
              key === 'shift' && styles.keyShift,
              key === 'backspace' && styles.backSpace
            ]}
            onPressIn={() => handleKeyDown({ key })}
            onPressOut={() => handleKeyUp({ key })}
        >
          {keyToIcon[key] ? <Icon name={keyToIcon[key]} size={width > 600 ? 24 : width > 400 ? 18 : 14} color="#FFFFFF" /> : <Text style={styles.keyText}>{displayKey}</Text>}
        </Pressable>
    );
  }, [focusedKeys, isCapsLock, handleKeyDown, handleKeyUp, styles.key, width, styles.backSpace]);

  const rows = useMemo(() => keys.map((row, rowIndex) => (
      <View key={`row-${rowIndex}`} style={styles.row}>
        {row.map((key, keyIndex) => renderKey(key, rowIndex, keyIndex))}
      </View>
  )), [renderKey, styles.row]);

  return (
      <View style={styles.container}>
        <TextInput
            style={styles.input}
            value={inputValue}
            onChangeText={setInputValue}
            placeholder={"Type here"}
            textAlign={"center"}
            spellCheck={false}
            onKeyPress={({ nativeEvent }) => {
              const key = nativeEvent.key.toLowerCase();
              setFocusedKeys(prevKeys => [...new Set([...prevKeys, key])]);
            }}
        />
        <View style={styles.keyboard}>
          {rows}
        </View>
      </View>
  );
};

export default Keyboard;
