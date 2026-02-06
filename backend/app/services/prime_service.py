from math import sqrt


def is_prime(n: int) -> bool:
    if n <= 1:
        return False
    if n <= 3:
        return True
    if n % 2 == 0:
        return n == 2

    limit = int(sqrt(n))
    d = 3
    while d <= limit:
        if n % d == 0:
            return False
        d += 2
    return True
