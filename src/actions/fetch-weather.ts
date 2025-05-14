"use server";

export type WeatherData = {
  temperature: number;
  weatherIcon: string;
  location: string;
  time: string;
};

export type WeatherResponse = {
  data: WeatherData | null;
  error: string | null;
  isLoading: boolean;
};

export const getWeatherData = async (
  location: string = "Patra, Greece"
): Promise<WeatherResponse> => {
  try {
    const apiKey = process.env.WEATHER_API_KEY;

    if (!apiKey) {
      console.error("Weather API key not configured");
      return {
        data: null,
        error: "Weather service not configured",
        isLoading: false,
      };
    }

    // Sanitize location to prevent injection
    const sanitizedLocation = location.trim().replace(/[^\w\s,.-]/g, "");

    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(
        sanitizedLocation
      )}&aqi=no`,
      {
        next: { revalidate: 1800 }, // Cache for 30 minutes
      }
    );

    if (!response.ok) {
      console.error(
        `Weather API error: ${response.status} ${response.statusText}`
      );
      return {
        data: null,
        error: "Failed to fetch weather data",
        isLoading: false,
      };
    }

    const apiData = await response.json();

    // Extract only the data needed for the sidebar
    const weatherData: WeatherData = {
      temperature: apiData.current?.temp_c || 0,
      weatherIcon: apiData.current?.condition?.icon || "",
      location: apiData.location?.name || location,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
    };

    return {
      data: weatherData,
      error: null,
      isLoading: false,
    };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return {
      data: null,
      error: "Failed to fetch weather data",
      isLoading: false,
    };
  }
};
