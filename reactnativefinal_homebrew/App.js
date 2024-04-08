// Importing libraries needed for the app
import 'react-native-gesture-handler';

import React, { useState, useEffect } from 'react';
// Import * as React from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  Pressable,
  SafeAreaView,
} from 'react-native';
import { CheckBox } from 'react-native-elements';
import { NavigationContainer, useRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// checks if we have everything
import AppLoading from 'expo-app-loading';

// This is our welcome/login screen
function WelcomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text>{'\n'}</Text>
      <Text style={styles.title}>
        {'\n'}Welcome{'\n'}
      </Text>
      <Image
        source={require('./assets/newLogo.png')}
        style={{
          height: 250,
          width: 250,
          alignSelf: 'center',
          borderRadius: 125,
        }}
      />
      <Text>{'\n'}</Text>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('New User')}>
        <Text style={styles.buttontext}>Let's Get Started</Text>
      </Pressable>
    </SafeAreaView>
  );
}

// This is our home page where the user can access their recipes, find new recipes, and even edit their preferences
function HomePage({ navigation, route }) {
  const { userPreferences } = route.params;
  console.log('userArray:', userPreferences);

  return (
    <SafeAreaView style={styles.container}>
      <Text>{'\n\n'}</Text>
      <Text style={styles.title}>
        {'\n'}Welcome Back{'\n\n'}
      </Text>
      <Text>{'\n'}</Text>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('New Recipes', { userPreferences })}>
        <Text style={styles.buttontext}>Find Recipes</Text>
      </Pressable>
      <Text>{'\n'}</Text>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('New User')}>
        <Text style={styles.buttontext}>Update Preferences</Text>
      </Pressable>
    </SafeAreaView>
  );
}

// This screen right here for the user to set their preferences and save them
function NewUser({ navigation }) {
  // Initial array to mark all options as false
  const initialPreferences = [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ];

  const flavorOptions = [
    'Bitter',
    'Semi-Sweet',
    'Sweet',
    'Chocolate/Mocha',
    'Vanilla',
    'Peppermint',
    'Cinnamon',
    'Hazelnut',
    'Caramel',
  ];

  // Holds the user's preferences
  const [userPreferences, setUserPreferences] = useState(initialPreferences);

  // This will handle the changes made in this screen.
  const handlePerferenceChange = (index) => {
    const updatedPreferences = [...userPreferences];
    updatedPreferences[index] = !updatedPreferences[index];
    setUserPreferences(updatedPreferences);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>
          {'\n'}Welcome to Home Brew{'\n'}
        </Text>
        <Text style={styles.paragraph}>
          Before we begin, let's create a preference profile for you! Select the
          check boxes to approve your preferences and diet restrictions.{'\n'}
        </Text>
        <Text style={styles.title}>Flavor Preferences{'\n'}</Text>
        {userPreferences.map(
          (
            isChecked,
            index // Maps out the checkboxes
          ) => (
            <View key={index}>
              <CheckBox
                checked={isChecked}
                onPress={() => handlePerferenceChange(index)}
                title={flavorOptions[index]}
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                checkedColor="green"
              />
            </View>
          )
        )}
        <Text>{'\n'}</Text>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate('Home', { userPreferences })}>
          <Text style={styles.buttontext}>Finished</Text>
        </Pressable>
        <Text>{'\n'}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

// This page is where the user will be able to access the different recipes available on Home Brew
function MyRecipes({ navigation, route }) {
  const { userPreferences } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('./assets/teabooks.png')}
        style={{ height: '25%', width: '60%', alignSelf: 'center' }}
      />
      <Text style={styles.title}>Available Recipes</Text>
    </SafeAreaView>
  );
}

function NewRecipes({ navigation, route }) {
  const { userPreferences } = route.params;
  console.log('userArray:', userPreferences);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        {'\n'}Find New Recipes{'\n'}
      </Text>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('Americano', { userPreferences })}>
        <Text style={styles.buttontext}>Americano</Text>
      </Pressable>
      <Text>{'\n'}</Text>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('Macchiato', { userPreferences })}>
        <Text style={styles.buttontext}>Macchiato</Text>
      </Pressable>
      <Text>{'\n'}</Text>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('Latte', { userPreferences })}>
        <Text style={styles.buttontext}>Latte</Text>
      </Pressable>
      <Text>{'\n'}</Text>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('Mocha', { userPreferences })}>
        <Text style={styles.buttontext}>Mocha</Text>
      </Pressable>
      <Text>{'\n'}</Text>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('Matcha', { userPreferences })}>
        <Text style={styles.buttontext}>Matcha</Text>
      </Pressable>
    </SafeAreaView>
  );
}

function Americano({ navigation, route }) {
  const { userPreferences } = route.params;
  const americanoAnswers = [
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ];

  const [totalPercentage, setTotalPercentage] = useState(null);

  const calculatePercentage = () => {
    const totalOptions = americanoAnswers.length;
    const americanoChoices = userPreferences.reduce(
      (count, userAnswer, index) => {
        return count + (userAnswer === americanoAnswers[index] ? 1 : 0);
      },
      0
    );

    const totalPercentage = ((americanoChoices / totalOptions) * 100).toFixed(2);

    console.log('Percentage:', totalPercentage);

    setTotalPercentage(totalPercentage);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>{'\n'}Americano</Text>
        <Image
          source={require('./assets/americano.png')}
          style={{ height: '20%', width: '40%', alignSelf: 'center' }}
        />
        <Text>{'\n'}</Text>
        <Pressable style={styles.button} onPress={calculatePercentage}>
          <Text style={styles.buttontext}>Calculate Percent</Text>
        </Pressable>
        <Text style={styles.text}>
          {'\n'}Match Score:{' '}
          {totalPercentage !== null ? `${totalPercentage}%` : 'N/A'}
        </Text>
        <Text style={styles.text}>
          {'\n'}This popular drink helps smooth the bitterness of espresso with
          hot water{'\n'}Ingredients
        </Text>
        <Text style={styles.text}>
          2 ounces (2 shots) espresso{'\n'}4 ounces hot water
        </Text>
        <Text style={styles.text}>Instructions</Text>
        <Text style={styles.text}>
          1. Make the espresso: Make your espresso using an espresso machine or
          whatever means you have to make your espresso{'\n'}2. Add hot water:
          Heat water using your espresso or in tea pot to about 190 degrees F.
          Pour it into the espresso. Enjoy!{'\n'}*Note: If desired, you can
          adjust the level of boiling water to your tastes. Go up to 6 ounces
          boiling water for a flavor that is closer to drip coffee.{'\n\n'}
        </Text>
        <Text style={styles.text}>
          Recipe credit: https://www.acouplecooks.com/how-to-make-an-americano/{' '}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

function Macchiato({ navigation, route }) {
  const { userPreferences } = route.params;
  const americanoAnswers = [
    false,
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ];

  const [totalPercentage, setTotalPercentage] = useState(null);

  const calculatePercentage = () => {
    const totalOptions = americanoAnswers.length;
    const americanoChoices = userPreferences.reduce(
      (count, userAnswer, index) => {
        return count + (userAnswer === americanoAnswers[index] ? 1 : 0);
      },
      0
    );

    const totalPercentage = ((americanoChoices / totalOptions) * 100).toFixed(2);

    console.log('Percentage:', totalPercentage);

    setTotalPercentage(totalPercentage);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>{'\n'}Macchiato</Text>
        <Image
          source={require('./assets/cappuccino.png')}
          style={{ height: '20%', width: '40%', alignSelf: 'center' }}
        />
        <Text>{'\n'}</Text>
        <Pressable style={styles.button} onPress={calculatePercentage}>
          <Text style={styles.buttontext}>Calculate Percent</Text>
        </Pressable>
        <Text style={styles.text}>
          {'\n'}Match Score:{' '}
          {totalPercentage !== null ? `${totalPercentage}%` : 'N/A'}
        </Text>
        <Text style={styles.text}>
          {'\n'}A true and classic macchiato. A lighter version of a latte but
          with the same amount of caffeine{'\n'}Ingredients
        </Text>
        <Text style={styles.text}>
          2 ounces (2 shots) espresso{'\n'}2 ounces (1/4 cup) whole milk foam*
        </Text>
        <Text style={styles.text}>Instructions</Text>
        <Text style={styles.text}>
          {'\n'}1. Make the espresso: Use an espresso machine or manual espresso
          maker to make your espresso. Pour it into a mug. {'\n'}2. Steam the
          milk: Start with 1/2 cup milk (you'll only need 1/4 cup of the foam).
          Heat the milk to 150 degrees Fahrenheit, not hot to the touch, but not
          simmering. {'\n'}3. Froth the milk: Use your espresso machine, milk
          frother, French press, or whisk to froth the milk into small, even
          bubbles. You'll want lots of "dry foam" for a macchiato. {'\n'}4.
          Spoon the foam on top: Use a spoon to remove the top of the foam and
          gently place it on top of the espresso. You should use about 1/4 cup
          foam for one drink.
          {'\n\n'}Note: Whole milk works best, but you can use other milks as
          well.
        </Text>
        <Text style={styles.text}>
          Recipe credit: https://www.acouplecooks.com/how-to-make-a-macchiato/
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

function Latte({ navigation, route }) {
  const { userPreferences } = route.params;
  const americanoAnswers = [
    false,
    true,
    false,
    false,
    true,
    false,
    false,
    false,
    false,
  ];

  const [totalPercentage, setTotalPercentage] = useState(null);

  const calculatePercentage = () => {
    const totalOptions = americanoAnswers.length;
    const americanoChoices = userPreferences.reduce(
      (count, userAnswer, index) => {
        return count + (userAnswer === americanoAnswers[index] ? 1 : 0);
      },
      0
    );

    const totalPercentage = ((americanoChoices / totalOptions) * 100).toFixed(2);

    console.log('Percentage:', totalPercentage);

    setTotalPercentage(totalPercentage);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>{'\n'}Latte</Text>
        <Image
          source={require('./assets/cafelatte.png')}
          style={{ height: '20%', width: '40%', alignSelf: 'center' }}
        />
        <Text>{'\n'}</Text>
        <Pressable style={styles.button} onPress={calculatePercentage}>
          <Text style={styles.buttontext}>Calculate Percent</Text>
        </Pressable>
        <Text style={styles.text}>
          {'\n'}Match Score:{' '}
          {totalPercentage !== null ? `${totalPercentage}%` : 'N/A'}
        </Text>
        <Text style={styles.text}>
          {'\n'}Also known as a cafe latte, a creamy and foamy drink.
          {'\n'}Ingredients
        </Text>
        <Text style={styles.text}>
          2 espresso shots (2 ounces){'\n'}4 ounces (1/2 cup) fresh whole milk*
        </Text>
        <Text style={styles.text}>Instructions</Text>
        <Text style={styles.text}>
          {'\n'}1. Make your espresso: Use an espresso machine or manual
          espresso maker to make two shots of espresso and pour it into a mug.}
          {'\n'}2. Steam your milk: Steam using your espresso machine, or heat
          the milk to scalding and foam it. {'\n'}3. Serve: Tap your milk and
          swirl it to break down any bubbles. Pour milk into center of the
          espresso, ending with light foam. {'\n\n'}Note: Whole milk works best,
          but you can use other milks as well.
        </Text>
        <Text style={styles.text}>
          Recipe credit: https://www.acouplecooks.com/how-to-make-a-latte/
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

function Mocha({ navigation, route }) {
  const { userPreferences } = route.params;
  const americanoAnswers = [
    false,
    true,
    true,
    true,
    false,
    false,
    false,
    false,
    false,
  ];

  const [totalPercentage, setTotalPercentage] = useState(null);

  const calculatePercentage = () => {
    const totalOptions = americanoAnswers.length;
    const americanoChoices = userPreferences.reduce(
      (count, userAnswer, index) => {
        return count + (userAnswer === americanoAnswers[index] ? 1 : 0);
      },
      0
    );

    const totalPercentage = ((americanoChoices / totalOptions) * 100).toFixed(2);

    console.log('Percentage:', totalPercentage);

    setTotalPercentage(totalPercentage);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>{'\n'}Mocha</Text>
        <Image
          source={require('./assets/mocha.png')}
          style={{ height: '20%', width: '40%', alignSelf: 'center' }}
        />
        <Text>{'\n'}</Text>
        <Pressable style={styles.button} onPress={calculatePercentage}>
          <Text style={styles.buttontext}>Calculate Percent</Text>
        </Pressable>
        <Text style={styles.text}>
          {'\n'}Match Score:{' '}
          {totalPercentage !== null ? `${totalPercentage}%` : 'N/A'}
        </Text>
        <Text style={styles.text}>
          {'\n'}A delicious popular drink that pairs espresso, milk, and
          chocolate.
          {'\n'}Ingredients
        </Text>
        <Text style={styles.text}>
          2 espresso shots (2 ounces){'\n'}1 tablespoon chocolate chips{'\n'}4
          ounces (1/2 cup) fresh whole milk*{'\n'}1/2 tablespoon maple syrup (or
          simple syrup){'\n'}For garnish: chocolate shavings
        </Text>
        <Text style={styles.text}>Instructions</Text>
        <Text style={styles.text}>
          {'\n'}1. Make the espresso: Make a doubleshot of espresso. Place the
          chocolate chips into the mug and pour the espresso on top. {'\n'}2.
          Steam your milk: Steam your milk with your espresso machine, or use a
          foaming method {'\n'}3. Serve: Swirl the milk container a few times.
          Pour the milk and foam into the center of the espresso. If desired,
          top with chocolate shavings for garnish.{'\n\n'}Note: Whole milk works
          best, but you can use other milks as well.
        </Text>
        <Text style={styles.text}>
          Recipe credit: https://www.acouplecooks.com/how-to-make-a-mocha/
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

function Matcha({ navigation, route }) {
  const { userPreferences } = route.params;
  const americanoAnswers = [
    true,
    true,
    false,
    false,
    true,
    false,
    false,
    false,
    false,
  ];

  const [totalPercentage, setTotalPercentage] = useState(null);

  const calculatePercentage = () => {
    const totalOptions = americanoAnswers.length;
    const americanoChoices = userPreferences.reduce(
      (count, userAnswer, index) => {
        return count + (userAnswer === americanoAnswers[index] ? 1 : 0);
      },
      0
    );

    const totalPercentage = ((americanoChoices / totalOptions) * 100).toFixed(2);

    console.log('Percentage:', totalPercentage);

    setTotalPercentage(totalPercentage);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>{'\n'}Iced Matcha Latte</Text>
        <Image
          source={require('./assets/Iced_Matcha_Latte.png')}
          style={{ height: '30%', width: '40%', alignSelf: 'center' }}
        />
        <Text>{'\n'}</Text>
        <Pressable style={styles.button} onPress={calculatePercentage}>
          <Text style={styles.buttontext}>Calculate Percent</Text>
        </Pressable>
        <Text style={styles.text}>
          {'\n'}Match Score:{' '}
          {totalPercentage !== null ? `${totalPercentage}%` : 'N/A'}
        </Text>
        <Text style={styles.text}>
          {'\n'}A chill and creamy drink with just the right hint of sweetness,
          but not too sweet.
          {'\n'}Ingredients
        </Text>
        <Text style={styles.text}>
          1 teaspoon matcha green tea powder{'\n'}2 ounces (1/4 cup) cool
          filtered water{'\n'}1 tablespoon honey (or maple syrup or vanilla
          syrup){'\n'}6 ounces (3/4 cup) skim milk, oatmilk, or almond milk
          {'\n'}Optional: Cold foam
        </Text>
        <Text style={styles.text}>Instructions</Text>
        <Text style={styles.text}>
          {'\n'}1. Whisk the matcha: Add matcha to a bowl and add a drizzle of
          the cool water. Whisk the matcha with either a bamboo whisk or a
          regular whisk, whisk until it becomes a paste. Add remaining water and
          whisk until a thick, foamy layer appears. You may also use the shake
          method instead by shaking the water and matcha in a har until frothy.
          {'\n'}2. Add honey: Add your honey and whisk a few more seconds {'\n'}
          3. Froth the milk: Froth the milk by placing it in a jar with a lid
          and shaking vigorously for 30 seconds (You can skip this step if
          desired){'\n'}4. Serve: Pour the matcha into an iced-filled glass.
          Pour the milk over the matcha, stir, and enjoy.
        </Text>
        <Text style={styles.text}>
          Recipe credit: https://www.acouplecooks.com/iced-matcha-latte/
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

// Create nav component
const Stack = createStackNavigator();

// This will take care of all our navigation
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="My Recipes" component={MyRecipes} />
        <Stack.Screen name="New User" component={NewUser} />
        <Stack.Screen name="New Recipes" component={NewRecipes} />
        <Stack.Screen name="Americano" component={Americano} />
        <Stack.Screen name="Macchiato" component={Macchiato} />
        <Stack.Screen name="Latte" component={Latte} />
        <Stack.Screen name="Mocha" component={Mocha} />
        <Stack.Screen name="Matcha" component={Matcha} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// StyleSheet/CSS
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(129, 182, 157)',
    height: '100%',
    width: '100%',
  },
  title: {
    fontSize: 28,
    color: 'rgb(235, 244, 242)',
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  scrollView: {
    backgroundColor: 'rgb(129, 182, 157)',
    marginHorizontal: 20,
    flexGrow: 2,
    paddingBottom: 380,
  },
  buttontext: {
    fontSize: 20,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'rgb(235, 244, 242)',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
    elevation: 3,
    backgroundColor: 'rgb(97, 143, 121)',
  },
  paragraph: {
    alignSelf: 'center',
    color: 'rgb(235, 244, 242)',
    fontSize: 16,
  },
  text: {
    fontSize: 16,
    color: 'rgb(235, 244, 242)',
    paddingLeft: 14,
  },
});

export default App;
