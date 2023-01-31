from spleeter.separator import Separator
import sys

if __name__ == '__main__':
    arg1 = sys.argv[1]
    separator = Separator('spleeter:2stems')
    separator.separate_to_file(arg1, 'public/audios')