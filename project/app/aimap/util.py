import unicodedata



def unicode2ascii(string):
    """Converts unicode string to ascii as close as possible"""
    return unicodedata.normalize('NFKD', string).encode('ascii', 'ignore')

