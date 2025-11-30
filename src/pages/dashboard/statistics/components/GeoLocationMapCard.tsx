import { useGetDashboardStatisticsQuery } from '@/services/profile';
import { IGeoLocation } from '@/services/profile/type';
import { StudentLivingStatus } from '@/services/student/type';
import { Card, Flex, Spin, Typography } from 'antd';
import { MapPin } from 'lucide-react';
import { useMemo, useState } from 'react';
import {
    ComposableMap,
    Geographies,
    Geography,
    Marker,
    ZoomableGroup,
} from 'react-simple-maps';
import { ExpandItem, IStatisticsCardProps } from './interface';


// Uzbekistan GeoJSON URL (TopoJSON format)
const UZBEKISTAN_TOPO_JSON =
    'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json';

// Uzbekistan boundaries (approximate)
const UZBEKISTAN_CENTER = [64, 41.5] as [number, number];
const UZBEKISTAN_BOUNDS = {
    minLat: 37.2,
    maxLat: 45.6,
    minLng: 56,
    maxLng: 73.2,
};

// Status colors matching your design
const STATUS_COLORS = {
    [StudentLivingStatus.GREEN]: '#10b981',
    [StudentLivingStatus.YELLOW]: '#f59e0b',
    [StudentLivingStatus.RED]: '#ef4444',
};

const STATUS_LABELS = {
    [StudentLivingStatus.GREEN]: 'Yashil hudud',
    [StudentLivingStatus.YELLOW]: "Sariq hudud",
    [StudentLivingStatus.RED]: 'Qizil hudud',
};

const UzbekistanMapCard = ({ isDark, PRIMARY }: IStatisticsCardProps) => {
    const { data, isFetching } = useGetDashboardStatisticsQuery({
        expand: `${ExpandItem.GEO_LOCATION_STATISTICS}`,
    });

    const [selectedMarker, setSelectedMarker] = useState<IGeoLocation | null>(
        null
    );
    const [zoom, setZoom] = useState(2);
    const [center, setCenter] = useState<[number, number]>(UZBEKISTAN_CENTER);

    // Process locations and count by status
    const { locations, statusCounts } = useMemo(() => {
        const locs = data?.result?.geo_location_statistics?.locations || [];

        // Filter locations within Uzbekistan bounds
        const filteredLocs = locs.filter(
            loc =>
                loc.latitude >= UZBEKISTAN_BOUNDS.minLat &&
                loc.latitude <= UZBEKISTAN_BOUNDS.maxLat &&
                loc.longitude >= UZBEKISTAN_BOUNDS.minLng &&
                loc.longitude <= UZBEKISTAN_BOUNDS.maxLng
        );

        // Count by status
        const counts = {
            [StudentLivingStatus.GREEN]: 0,
            [StudentLivingStatus.YELLOW]: 0,
            [StudentLivingStatus.RED]: 0,
        };

        filteredLocs.forEach(loc => {
            if (counts.hasOwnProperty(loc.living_status)) {
                counts[loc.living_status]++;
            }
        });

        return { locations: filteredLocs, statusCounts: counts };
    }, [data]);

    const handleMarkerClick = (location: IGeoLocation) => {
        setSelectedMarker(location);
    };

    const handleZoomIn = () => {
        setZoom(prevZoom => Math.min(prevZoom * 1.5, 15));
    };

    const handleZoomOut = () => {
        setZoom(prevZoom => Math.max(prevZoom / 1.5, 1));
    };

    const handleReset = () => {
        setZoom(1);
        setCenter(UZBEKISTAN_CENTER);
        setSelectedMarker(null);
    };

    return (
        <Card
            className="w-full uzbekistan-map-card"
            title={
                <Flex justify="space-between" align="center">
                    <Typography.Title
                        level={4}
                        style={{ color: isDark ? '#fff' : '#1a1a1a', margin: 0 }}
                    >
                        Xarita bo'yicha joylashuv
                    </Typography.Title>
                    <MapPin size={20} style={{ color: PRIMARY }} />
                </Flex>
            }
            style={{
                background: isDark ? 'rgba(15, 23, 42, 0.6)' : '#fff',
                backdropFilter: 'blur(10px)',
                border: `1px solid ${PRIMARY}20`,
                borderRadius: '16px',
            }}
        >
            {isFetching ? (
                <Flex
                    justify="center"
                    align="center"
                    style={{ minHeight: '400px', position: 'relative' }}
                >
                    <Spin size="large" />
                </Flex>
            ) : (
                <Flex vertical gap={16}>
                    {/* Legend */}
                    <Flex justify="space-between" align="center" wrap gap={12}>
                        {Object.entries(STATUS_LABELS).map(([status, label]) => (
                            <Flex key={status} align="center" gap={8}>
                                <div
                                    style={{
                                        width: 16,
                                        height: 16,
                                        borderRadius: '50%',
                                        background: STATUS_COLORS[status as StudentLivingStatus],
                                        boxShadow: `0 0 8px ${STATUS_COLORS[status as StudentLivingStatus]}80`,
                                    }}
                                />
                                <Typography.Text
                                    style={{
                                        color: isDark ? '#fff' : '#1a1a1a',
                                        fontSize: '13px',
                                    }}
                                >
                                    {label}
                                </Typography.Text>
                                <Typography.Text
                                    strong
                                    style={{
                                        color: PRIMARY,
                                        fontSize: '14px',
                                    }}
                                >
                                    {statusCounts[status as StudentLivingStatus] || 0}
                                </Typography.Text>
                            </Flex>
                        ))}
                    </Flex>

                    {/* Map Container */}
                    <div
                        style={{
                            position: 'relative',
                            width: '100%',
                            height: '500px',
                            background: isDark
                                ? 'rgba(15, 23, 42, 0.4)'
                                : 'rgba(240, 240, 240, 0.5)',
                            borderRadius: '12px',
                            overflow: 'hidden',
                            border: `1px solid ${isDark ? '#ffffff10' : '#00000010'}`,
                        }}
                    >
                        <ComposableMap
                            projection="geoMercator"
                            projectionConfig={{
                                center: UZBEKISTAN_CENTER,
                                scale: 2000,
                            }}
                            style={{ width: '100%', height: '100%' }}
                        >
                            <ZoomableGroup
                                zoom={zoom}
                                center={center}
                                onMoveEnd={({ coordinates, zoom }) => {
                                    const [lng, lat] = coordinates;
                                    const constrainedLng = Math.max(
                                        UZBEKISTAN_BOUNDS.minLng,
                                        Math.min(UZBEKISTAN_BOUNDS.maxLng, lng)
                                    );
                                    const constrainedLat = Math.max(
                                        UZBEKISTAN_BOUNDS.minLat,
                                        Math.min(UZBEKISTAN_BOUNDS.maxLat, lat)
                                    );
                                    setCenter([constrainedLng, constrainedLat]);
                                    setZoom(zoom);
                                }}
                            >
                                <Geographies geography={UZBEKISTAN_TOPO_JSON}>
                                    {({ geographies }) =>
                                        geographies
                                            .filter(geo => geo.properties.name === 'Uzbekistan')
                                            .map(geo => (
                                                <Geography
                                                    key={geo.rsmKey}
                                                    geography={geo}
                                                    fill={isDark ? '#0f172a' : '#e5e7eb'}
                                                    stroke={isDark ? '#334155' : '#9ca3af'}
                                                    strokeWidth={0.5}
                                                    style={{
                                                        default: { outline: 'none' },
                                                        hover: { outline: 'none' },
                                                        pressed: { outline: 'none' },
                                                    }}
                                                />
                                            ))
                                    }
                                </Geographies>

                                {/* Markers */}
                                {locations?.map((location, index) => (
                                    <Marker
                                        key={`marker-${index}`}
                                        coordinates={[location.longitude, location.latitude]}
                                    >
                                        <circle
                                            r={6 / zoom}
                                            fill={STATUS_COLORS[location.living_status]}
                                            stroke="#fff"
                                            strokeWidth={1.5 / zoom}
                                            style={{
                                                cursor: 'pointer',
                                                filter: `drop-shadow(0 0 ${4 / zoom}px ${STATUS_COLORS[location.living_status]})`,
                                            }}
                                            onClick={() => handleMarkerClick(location as any)}
                                            onMouseEnter={e => {
                                                e.currentTarget.setAttribute('r', String(8 / zoom));
                                            }}
                                            onMouseLeave={e => {
                                                e.currentTarget.setAttribute('r', String(6 / zoom));
                                            }}
                                        />
                                    </Marker>
                                ))}
                            </ZoomableGroup>
                        </ComposableMap>

                        {/* Zoom Controls */}
                        <Flex
                            vertical
                            gap={8}
                            style={{
                                position: 'absolute',
                                bottom: '16px',
                                right: '16px',
                                zIndex: 10,
                            }}
                        >
                            <button
                                onClick={handleZoomIn}
                                style={{
                                    width: '36px',
                                    height: '36px',
                                    borderRadius: '8px',
                                    border: 'none',
                                    background: isDark
                                        ? 'rgba(15, 23, 42, 0.8)'
                                        : 'rgba(255, 255, 255, 0.9)',
                                    color: isDark ? '#fff' : '#1a1a1a',
                                    cursor: 'pointer',
                                    fontSize: '18px',
                                    fontWeight: 'bold',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backdropFilter: 'blur(10px)',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                }}
                            >
                                +
                            </button>
                            <button
                                onClick={handleZoomOut}
                                style={{
                                    width: '36px',
                                    height: '36px',
                                    borderRadius: '8px',
                                    border: 'none',
                                    background: isDark
                                        ? 'rgba(15, 23, 42, 0.8)'
                                        : 'rgba(255, 255, 255, 0.9)',
                                    color: isDark ? '#fff' : '#1a1a1a',
                                    cursor: 'pointer',
                                    fontSize: '18px',
                                    fontWeight: 'bold',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backdropFilter: 'blur(10px)',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                }}
                            >
                                −
                            </button>
                            <button
                                onClick={handleReset}
                                style={{
                                    width: '36px',
                                    height: '36px',
                                    borderRadius: '8px',
                                    border: 'none',
                                    background: isDark
                                        ? 'rgba(15, 23, 42, 0.8)'
                                        : 'rgba(255, 255, 255, 0.9)',
                                    color: isDark ? '#fff' : '#1a1a1a',
                                    cursor: 'pointer',
                                    fontSize: '14px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backdropFilter: 'blur(10px)',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                }}
                                title="Reset"
                            >
                                ⟲
                            </button>
                        </Flex>
                    </div>

                    {/* Selected Marker Info */}
                    {selectedMarker && (
                        <Card
                            size="small"
                            style={{
                                background: isDark
                                    ? 'rgba(15, 23, 42, 0.9)'
                                    : 'rgba(255, 255, 255, 0.9)',
                                border: `1px solid ${STATUS_COLORS[selectedMarker.living_status]}60`,
                                borderRadius: '12px',
                            }}
                        >
                            <Flex vertical gap={8}>
                                <Flex justify="space-between" align="center">
                                    <Typography.Text
                                        strong
                                        style={{ color: isDark ? '#fff' : '#1a1a1a' }}
                                    >
                                        {selectedMarker.geo_location}
                                    </Typography.Text>
                                    <Flex align="center" gap={6}>
                                        <div
                                            style={{
                                                width: 12,
                                                height: 12,
                                                borderRadius: '50%',
                                                background: STATUS_COLORS[selectedMarker.living_status],
                                            }}
                                        />
                                        <Typography.Text
                                            style={{
                                                color: STATUS_COLORS[selectedMarker.living_status],
                                                fontSize: '13px',
                                            }}
                                        >
                                            {STATUS_LABELS[selectedMarker.living_status]}
                                        </Typography.Text>
                                    </Flex>
                                </Flex>
                                <Typography.Text
                                    style={{
                                        color: isDark ? 'rgba(255, 255, 255, 0.7)' : '#666',
                                        fontSize: '13px',
                                    }}
                                >
                                    Talabalar soni: <strong>{selectedMarker.count}</strong>
                                </Typography.Text>
                                <Typography.Text
                                    style={{
                                        color: isDark ? 'rgba(255, 255, 255, 0.6)' : '#888',
                                        fontSize: '12px',
                                    }}
                                >
                                    Koordinatalar: {selectedMarker.latitude.toFixed(4)},{' '}
                                    {selectedMarker.longitude.toFixed(4)}
                                </Typography.Text>
                            </Flex>
                        </Card>
                    )}

                    {/* Statistics Summary */}
                    <Flex justify="space-between" align="center" wrap gap={12}>
                        <Flex vertical>
                            <Typography.Text
                                style={{
                                    color: isDark ? 'rgba(255, 255, 255, 0.6)' : '#666',
                                    fontSize: '12px',
                                }}
                            >
                                Jami lokatsiyalar
                            </Typography.Text>
                            <Typography.Text
                                strong
                                style={{ color: PRIMARY, fontSize: '18px' }}
                            >
                                {locations.length}
                            </Typography.Text>
                        </Flex>
                        <Flex vertical>
                            <Typography.Text
                                style={{
                                    color: isDark ? 'rgba(255, 255, 255, 0.6)' : '#666',
                                    fontSize: '12px',
                                }}
                            >
                                Geolokatsiya bilan
                            </Typography.Text>
                            <Typography.Text
                                strong
                                style={{ color: PRIMARY, fontSize: '18px' }}
                            >
                                {data?.result?.geo_location_statistics?.with_location ?? 0}
                            </Typography.Text>
                        </Flex>
                    </Flex>
                </Flex>
            )}
        </Card>
    );
};

export default UzbekistanMapCard;