from typing import List
from app.services.math_service import gcd_all, mean, std_dev
from app.services.prime_service import is_prime

#centralizacion de como se analiza una serie
def analyze_numbers(nums: List[int]) -> dict:
    primes = [x for x in nums if is_prime(x)]
    return {
        "gcd_all": gcd_all(nums),
        "mean": round(mean(nums), 6),
        "std_dev": round(std_dev(nums), 6),
        "primes": primes,
    }
