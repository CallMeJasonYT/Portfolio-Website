"use client";

import { ReactElement, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { motion } from "motion/react";
import { IconLocationPin } from "@tabler/icons-react";

type WeatherData = {
  temperature: number;
  weatherIcon: string;
  location: string;
  isLoading: boolean;
  error: string | null;
  time: string;
};

type SidebarProps = {
  profileImage: string;
  name: string;
};

const Sidebar = ({ profileImage, name }: SidebarProps): ReactElement => {
  const [time, setTime] = useState<string>("");
  const [weather, setWeather] = useState<WeatherData>({
    temperature: 0,
    weatherIcon: "",
    location: "Patra, Greece",
    isLoading: true,
    error: null,
    time: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
  });

  useEffect(() => {
    setTime(
      new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
    );

    const timeInterval = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      );
    }, 60000);

    ("use client");

    const fetchWeather = async () => {
      try {
        const apiKey = process.env.WEATHER_API_KEY;
        // Use a public CORS proxy
        const corsProxyUrl = "https://corsproxy.io/?";
        const targetUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=Patra,Greece&aqi=no`;

        const response = await fetch(
          corsProxyUrl + encodeURIComponent(targetUrl)
        );

        if (!response.ok) {
          throw new Error("Failed to fetch weather data");
        }

        const data = await response.json();

        setWeather((prev) => ({
          ...prev,
          temperature: data.current?.temp_c || 0,
          weatherIcon: data.current?.condition?.icon || "",
          weatherCondition: data.current?.condition?.text || "",
          location: data.location?.name || "Patra, Greece",
          isLoading: false,
          error: null,
        }));
      } catch (error) {
        console.error("Error fetching weather:", error);
        setWeather((prev) => ({
          ...prev,
          isLoading: false,
          error: "Failed to load weather data",
        }));
      }
    };

    fetchWeather();

    const weatherInterval = setInterval(fetchWeather, 30 * 60 * 1000);

    return () => {
      clearInterval(timeInterval);
      clearInterval(weatherInterval);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={cn(
        "hidden lg:flex gap-3",
        "fixed left-0 top-0 h-screen bg-zinc-900/10 backdrop-blur-md border-r border-border",
        "flex-col items-center pt-32 pb-8 px-6",
        "w-60 lg:w-70 shadow-xl z-40"
      )}
    >
      {/* Profile image */}
      <div className="relative w-35 h-35 lg:w-40 lg:h-40 mb-6 rounded-full overflow-hidden border-2 border-primary/50 group">
        <Image
          src={profileImage}
          alt={name}
          fill
          className="object-cover transition-transform group-hover:scale-110 duration-300"
          priority
        />
      </div>

      {/* Name */}
      <div className="flex gap-1">
        <Image
          src="/media/wave.gif"
          alt="Waving Hand"
          width={28}
          height={28}
          draggable={false}
        />
        <span className="text-xl text-white font-semibold">
          Hi, I&apos;m Jason!
        </span>
      </div>

      {/* Location */}
      <div className="flex text-primary/60 gap-1 items-center">
        <IconLocationPin className="w-5" />
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Patra, Greece
        </motion.p>
      </div>

      {/* Weather and Time Widget */}
      <div className="w-full rounded-xl px-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            {weather.isLoading ? (
              <div className="animate-pulse h-10 w-10 bg-primary/30 rounded-full" />
            ) : (
              <img
                src={`https:${weather.weatherIcon}`}
                width={40}
                height={40}
                className="h-10 w-10 object-contain"
              />
            )}
            <div>
              <span className="text-white text-lg">
                {weather.isLoading ? (
                  <div className="animate-pulse h-5 w-16 bg-primary/30 rounded-md" />
                ) : (
                  `${Math.round(weather.temperature)}°C`
                )}
              </span>
            </div>
          </div>
          <div className="text-white text-lg" suppressHydrationWarning>
            {time}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
