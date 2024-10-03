import { HPlatform, HMap, HMapCircle } from "react-here-map";

const Map = ({ cancelMap, location }) => {
  const latitude = location.slice(0, 13);
  const longitude = location.slice(15, 29);

  return (
    <div style={{}}>
      <button
        style={{ color: "white", backgroundColor: "red" }}
        onClick={cancelMap}
      >
        X
      </button>
      <HPlatform
        options={{
          apiKey: "zcwP-B3A0Mbq9Ur1FzPRPrDcrBG3KQRKoHmd3usQwQ4",
          appId: "379y9YcSe3ik5zXVZsmb",
          includePlaces: false,
          includeUI: true,
          interactive: true,
          version: "v3/3.1",
        }}
      >
        <HMap
          options={{
            center: {
              lat: latitude,
              lng: longitude,
            },
          }}
          style={{
            height: "80%",
            width: "80%",
            position: "absolute",
          }}
          useEvents
        >
          <HMapCircle
            coords={{
              lat: latitude,
              lng: longitude,
            }}
            events={{
              pointerdown: function noRefCheck() {},
              pointerenter: function noRefCheck() {},
              pointerleave: function noRefCheck() {},
              pointermove: function noRefCheck() {},
            }}
            options={{
              style: {
                fillColor: "rgba(0, 128, 0, 0.7)",
                lineWidth: 4,
                strokeColor: "rgba(55, 85, 170, 0.6)",
              },
            }}
            radius={100}
            setVisibility
            zoom={15}
          />
        </HMap>
      </HPlatform>
    </div>
  );
};

export default Map;
