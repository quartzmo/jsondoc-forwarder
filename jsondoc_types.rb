#!/usr/bin/env ruby

##
# Copyright 2018 Chris Smith (quartzmo)
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     https://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
require 'ostruct'
require 'optparse'
require 'json'
require 'yaml'

options = OpenStruct.new

parser = OptionParser.new do|opts|
  opts.banner = "jsondoc_types.rb: Using the google-cloud types.json file, this " \
    "script produces a YAML file mapping lowercase jsondoc module names to camel-case YARD module names.\n\n" \
    "Example: ./jsondoc_types.rb -i ../google-cloud-ruby-gh-pages/json/google-cloud/master/types.json -o jsondoc_types.yaml\n\n" \
    "[options]"

  opts.on('-i', '--in path', 'Path to google-cloud types.json file') do |name|
    options.in = name;
  end

  opts.on('-o', '--out path', 'Path to YAML output file') do |age|
    options.out = age;
  end

  opts.on('-h', '--help', 'Displays Help') do
    puts opts
    exit
  end
end

parser.parse!

multiword_camel_case = /(.+?)([A-Z])/

types = JSON.parse File.read(options.in)
unsorted = {}
types.each do |type|
  title = type["title"]
  type = title.split("::").last
  unsorted[type.downcase] = type if !unsorted.key?(type.downcase) && type =~ multiword_camel_case
end
# Sort alphabetically for easier review.
sorted = {}
unsorted.keys.sort.each do |k|
  sorted[k] = unsorted[k]
end
File.open(options.out, 'w') { |f| f.write sorted.to_yaml }
puts "Wrote #{sorted.size} entries to #{options.out}"
