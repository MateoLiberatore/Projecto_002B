from typing import List
from math import gcd


def gcd_all(nums: List[int]) -> int:
    current = nums[0]
    for n in nums[1:]:
        current = gcd(current, n)
    return current


def mean(nums: List[int]) -> float:
    return sum(nums) / len(nums)


def std_dev(nums: List[int]) -> float:
    m = mean(nums)
    var = sum((x - m) ** 2 for x in nums) / len(nums)  # poblacional
    return var ** 0.5
