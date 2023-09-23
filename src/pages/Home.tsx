import React, { useCallback, useEffect, useState } from 'react'
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage'
import format from 'date-fns/format'
import debounce from 'lodash/debounce'
import {
  CalendarDaysIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
} from 'react-native-heroicons/solid'
import * as Progress from 'react-native-progress'
import { SafeAreaView } from 'react-native-safe-area-context'

import { StatusBar } from 'expo-status-bar'

import { weatherService } from '@services'
import { ForecastResponse, Location, WeatherImages } from '@services/types'
import { hp } from '@utils/responsive'

export const Home = () => {
  const [showSearch, setShowSearch] = useState(false)
  const [locations, setLocations] = useState<Location[]>([])
  const [weather, setWeather] = useState<ForecastResponse>(
    {} as ForecastResponse,
  )
  const [loading, setLoading] = useState(true)

  const handleLocation = async (locationName: string) => {
    await AsyncStorage.setItem('city', locationName)
    setLocations([])
    setShowSearch(false)
    setLoading(true)
    try {
      const response = await weatherService.getForecast({
        q: locationName,
        days: '7',
      })

      setWeather(response)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async (value: string) => {
    if (value.length < 2) return null

    try {
      const response = await weatherService.getLocations({ q: value })
      setLocations(response)
    } catch (error) {
      console.error(error)
    }
  }

  const handleTextDebounce = useCallback(debounce(handleSearch, 1200), [])

  const { forecast, current, location } = weather

  useEffect(() => {
    const initialLocation = async () => {
      const location = await AsyncStorage.getItem('city')
      handleLocation(location || 'Londrina')
    }

    initialLocation()
  }, [])

  return (
    <View className="flex-1 relative">
      <StatusBar style="light" />
      <Image
        blurRadius={70}
        source={require('@assets/images/bg.png')}
        className="absolute h-full w-full"
      />
      {loading ? (
        <View className="flex-1 flex-row justify-center items-center">
          <Progress.CircleSnail
            thickness={hp(1)}
            size={hp(10)}
            color="#0bb3b2"
          />
        </View>
      ) : (
        <SafeAreaView className="flex flex-1">
          {/* search section */}
          <View style={{ height: hp(7) }} className="mx-4 relative z-50">
            <View
              className={`flex-row justify-end items-center rounded-full ${
                showSearch ? 'bg-white/20' : 'transparent'
              }`}>
              {showSearch ? (
                <TextInput
                  onChangeText={handleTextDebounce}
                  placeholder="Search city"
                  placeholderTextColor="lightgray"
                  className="pl-6 h-10 flex-1 text-base text-white"
                />
              ) : null}
              <TouchableOpacity
                onPress={() => setShowSearch((old) => !old)}
                className="rounded-full p-3 m-1 bg-white/30">
                <MagnifyingGlassIcon size={hp(2.5)} color="white" />
              </TouchableOpacity>
            </View>

            {/* locations */}
            {locations.length && showSearch ? (
              <View className="absolute w-full bg-gray-300 top-16 rounded-3xl">
                {locations.map((location, index) => {
                  const showBorder = index + 1 !== locations.length

                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => handleLocation(location.name)}
                      className={`flex-row items-center border-0 p-3 px-4 mb-1 ${
                        showBorder && 'border-b-2 border-b-gray-400'
                      }`}>
                      <MapPinIcon size={hp(2)} color="gray" />
                      <Text className="text-black text-lg ml-2">
                        {location.name}, {location.country}
                      </Text>
                    </TouchableOpacity>
                  )
                })}
              </View>
            ) : (
              <></>
            )}
          </View>

          {/* forecast location */}
          <View className="mx-4 flex justify-around flex-1 mb-2">
            {/* location details */}
            <Text
              className="text-white text-center font-bold"
              style={{ fontSize: hp(2.3) }}>
              {location?.name},
              <Text
                className=" font-semibold text-gray-300"
                style={{ fontSize: hp(1.8) }}>
                {' ' + location?.country}
              </Text>
            </Text>

            {/* weather image */}
            <View className="flex-row justify-center">
              <Image
                source={
                  WeatherImages[
                    current?.condition?.text as keyof typeof WeatherImages
                  ]
                }
                style={{ height: hp(25), width: hp(25) }}
              />
            </View>

            {/* degree celcius */}
            <View className="space-y-2">
              <Text
                className="text-center font-bold text-white ml-5"
                style={{ fontSize: hp(6) }}>
                {current?.temp_c}&#176;
              </Text>
              <Text
                className="text-center text-white tracking-widest"
                style={{ fontSize: hp(1.8) }}>
                {current?.condition?.text}
              </Text>
            </View>

            {/* other stats */}
            <View className="flex-row justify-between mx-4">
              <View className="flex-row space-x-2 items-center">
                <Image
                  source={require('@assets/icons/wind.png')}
                  style={{ height: hp(3), width: hp(3) }}
                />
                <Text className="text-white font-semibold text-base">
                  {current?.wind_kph}km
                </Text>
              </View>
              <View className="flex-row space-x-2 items-center">
                <Image
                  source={require('@assets/icons/drop.png')}
                  style={{ height: hp(3), width: hp(3) }}
                />
                <Text className="text-white font-semibold text-base">
                  {current?.humidity}%
                </Text>
              </View>
              <View className="flex-row space-x-2 items-center">
                <Image
                  source={require('@assets/icons/sun.png')}
                  style={{ height: hp(3), width: hp(3) }}
                />
                <Text className="text-white font-semibold text-base">
                  {forecast?.forecastday[0]?.astro?.sunrise}
                </Text>
              </View>
            </View>

            {/* forecast for next days */}
            <View className="mb-2 space-y-3">
              <View className="flex-row items-center mx-5 space-x-2">
                <CalendarDaysIcon size={hp(2.5)} color="white" />
                <Text className="text-white text-base">Daily forecast</Text>
              </View>
              <ScrollView
                horizontal
                contentContainerStyle={{ paddingHorizontal: 15 }}
                showsHorizontalScrollIndicator={false}>
                {forecast?.forecastday?.map((item, index) => {
                  const date = format(new Date(item.date), 'EEEE')

                  return (
                    <View
                      key={index}
                      className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4 bg-white/10">
                      <Image
                        source={
                          WeatherImages[
                            item.day.condition
                              .text as keyof typeof WeatherImages
                          ]
                        }
                        style={{ height: hp(5), width: hp(5) }}
                      />
                      <Text className="text-white">{date}</Text>
                      <Text
                        className="text-white font-semibold"
                        style={{ fontSize: hp(2) }}>
                        {item.day.avgtemp_c}&#176;
                      </Text>
                    </View>
                  )
                })}
              </ScrollView>
            </View>
          </View>
        </SafeAreaView>
      )}
    </View>
  )
}
