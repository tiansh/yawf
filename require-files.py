# -*- coding: utf-8 -*-
import argparse
import re
import os

import urllib.request

def get_file_content(path, requires):
    if path.startswith('yaofang://'):
        filename = os.path.join(requires['yaofang'], 'extension', path[len('yaofang://'):])
        with open(filename, 'r', encoding='utf-8') as file:
            return file.read()
    if path.startswith('https://'):
        with urllib.request.urlopen(path) as req:
            return req.read().decode('utf-8')
    return ''

def inline_required_files(yawf, requires):
    with open(yawf, 'r', encoding='utf-8') as source_file:  
        source = source_file.readlines()

    result = []
    region_start, region_end = re.compile(r'^//#region @require (.*)'), re.compile(r'^//#endregion')

    in_require = False
    for line in source:
        if region_end.match(line):
            in_require = False
        match = region_start.match(line)
        if not in_require:
            result.append(line)
        if match:
            in_require = True
            content = get_file_content(str(match.group(1)), requires)
            result.append(content.rstrip() + '\n')

    output = ''.join(result)

    with open(yawf, 'w', newline='\n', encoding='utf-8') as output_file:
        output_file.write(output)

parser = argparse.ArgumentParser(description='A helper tool that inline required files')
parser.add_argument(
    'yawf',
    nargs='?',
    default='./Yet_Another_Weibo_Filter.user.js',
    help='path to yawf.user.js (default: "./Yet_Another_Weibo_Filter.user.js")'
)
parser.add_argument(
    '--yaofang',
    default='../yaofang',
    help='path to yaofang repo, a extension folder should be there (default: "../yaofang")'
)
args = vars(parser.parse_args())
inline_required_files(args['yawf'], { 'yaofang': args['yaofang'] })

