export type SeriesOut = {
  id: string;
  title: string;
  numbers: number[];
};

export type SeriesAnalysis = SeriesOut & {
  gcd_all: number;
  mean: number;
  std_dev: number;
  primes: number[];
};
