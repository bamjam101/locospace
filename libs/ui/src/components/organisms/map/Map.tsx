import MapGl, { useMap } from 'react-map-gl'

type MapProps = React.ComponentProps<typeof MapGl> & {
  height?: string
}

export const StyleMap = () => {
  const { current } = useMap()

  current?.on('style.load', () => {
    current?.getMap().setFog({
      color: 'rgb(255, 255, 255)', // Lower atmosphere color
      range: [1, 10],
      'high-color': 'rgb(200, 200, 200)', // Higher atmosphere color
      'horizon-blend': 0.05, // Atmosphere thickness (default 0.2 at low zooms)
      'space-color': 'rgb(150, 150, 150)', // Background color
      'star-intensity': 0.5, // background star brightness (default 0.35 at low zooms)
    })
  })

  return null
}

export const Map = ({ height = 'calc(100vh - 4rem)', ...props }: MapProps) => {
  return (
    <MapGl
      {...props}
      projection={{ name: 'globe' }}
      mapStyle={'mapbox://styles/iamkarthick/clebahxqe001701mo1i1adtw3'}
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      style={{ height }}
      scrollZoom={false}
    >
      <StyleMap />
      {props.children}
    </MapGl>
  )
}
