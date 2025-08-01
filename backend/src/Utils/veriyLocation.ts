function toRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

function getDistanceInMeters(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371e3; // Radius of Earth in meters
  const φ1 = toRadians(lat1);
  const φ2 = toRadians(lat2);
  const Δφ = toRadians(lat2 - lat1);
  const Δλ = toRadians(lon2 - lon1);

  const a =
    Math.sin(Δφ / 2) ** 2 + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

export function verifyUserLocation(
  userLat: number,
  userLon: number,
  expectedLat: number,
  expectedLon: number,
  maxDistanceMeters = 15
): boolean {
  const distance = getDistanceInMeters(
    userLat,
    userLon,
    expectedLat,
    expectedLon
  );
  return distance <= maxDistanceMeters;
}
