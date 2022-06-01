import React from "react";
import is from "classnames";
import usePlacesAutocomplete from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import { Input, LocationResultsContainer, Vertical } from "./style";
import { useKeyboardDirectional } from "hooks/useKeyboard";

const LOCATION = {
  LABEL: "Location",
  PLACEHOLDER: "Enter Location",
  PROPERTY: "workLocation"
};

export function Location({ label, ...properties }: any) {
  const {
    clearSuggestions,
    ready,
    setValue: changeValue,
    suggestions: { status, data }
  } = usePlacesAutocomplete({
    debounce: 300,
    requestOptions: { types: ["(cities)"] }
  });
  const { currentIndex, setCurrentIndex, enter, escape } =
    useKeyboardDirectional({ items: data });

  // Dismiss suggestions if user clicks outside of the component
  const reference = useOnclickOutside(() => clearSuggestions());

  React.useEffect(() => {
    if (enter === true || escape === true) {
      clearSuggestions();
      setCurrentIndex(-1);
    }
  }, [enter, escape, clearSuggestions, setCurrentIndex]);
  React.useEffect(() => {
    if (currentIndex in data) {
      changeValue(data[currentIndex].description, false);
      if (enter === true) {
        properties.onChange(data[currentIndex].description);
      }
    }
  }, [changeValue, currentIndex, data, enter, escape, properties]);

  return (
    <Vertical ref={reference}>
      {label !== null && (
        <label htmlFor={properties.id || LOCATION.PROPERTY}>
          {label || LOCATION.LABEL}
        </label>
      )}
      <Input
        autoComplete='off'
        className={is({ invalid: properties.hasError })}
        value={properties.value}
        disabled={!ready}
        id={properties.id || LOCATION.PROPERTY}
        name={properties.name || LOCATION.PROPERTY}
        onChange={handleInput}
        placeholder={properties.placeholder || LOCATION.PLACEHOLDER}
      />
      {/* We can use the "status" to decide whether we should display the dropdown or not */}
      {status === "OK" && (
        <LocationResults>{renderSuggestions()}</LocationResults>
      )}
    </Vertical>
  );
  // scope actions
  function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
    // Update the keyword of the input element
    properties.onChange(event.target.value);
    changeValue(event.target.value);
  }

  function handleSelect(suggestion: { description: string }) {
    return () => {
      // We can replace the keyword without calling API by setting the second parameter to "false"
      changeValue(suggestion.description, false);
      properties.onChange(suggestion.description);
      clearSuggestions();
      setCurrentIndex(-1);

      // Get latitude and longitude via utility functions
      /* getGeocode({ address: suggestion.description })
                .then((results) => getLatLng(results[0]))
                .then(({ lat, lng }) => {
                    console.log('📍 Coordinates: ', { lat, lng });
                })
                .catch((error) => {
                    console.log('😱 Error: ', error);
                }); */
    };
  }

  function renderSuggestions() {
    return data.map((suggestion, index) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text }
      } = suggestion;

      return (
        <div
          className={is({
            focused: index === currentIndex
          })}
          key={place_id}
          onClick={handleSelect(suggestion)}
        >
          <strong>{main_text}</strong>
          <small>{secondary_text}</small>
        </div>
      );
    });
  }
}

function LocationResults(properties: React.PropsWithChildren<any>) {
  return (
    <LocationResultsContainer>
      <div>{properties.children}</div>
    </LocationResultsContainer>
  );
}
