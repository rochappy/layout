process.env.NODE_ENV = 'development'

require 'coffee-script/register'
nobone = require 'nobone'
{ kit } = nobone()

stylus = require 'stylus'

{ Q, _ } = kit

os_path = kit.path
relative = os_path.relative
coffee_bin = './node_modules/.bin/coffee'

root_path = root_path = "#{__dirname}/"
src_path = "#{root_path}/src"
js_path = "#{src_path}/js"
css_path = "#{src_path}/css"
dist_path = "#{root_path}/dist"

copy= (from, to) =>
    kit.copy(from, to).then =>
        console.log '>> Copy: '.cyan + relative(root_path, from) + ' -> '.green + relative(root_path, to)

build= ->
    kit.remove dist_path
    Q.fcall =>
        console.log '>> Build start.'.cyan
    .then =>
        Q.all [
            compile_all_coffee()
            compile_all_stylus()
        ]
    .then =>
        Q.all([
            kit.glob os_path.join(js_path, '**', '*.js')
            kit.glob os_path.join(css_path, '**', '*.css')
            kit.glob os_path.join(src_path, '**', '*.html')
        ])
    .then (file_list) =>
        Q.all _.flatten(file_list).map (file) =>
            copy file, dist_path + '/' + relative(src_path, file)
    .then ->
        console.log '>> Build Done.'.green

clean = ->

    Q.fcall =>
        console.log 'Clean start'.cyan
    .then =>
        Q.all([
            kit.glob os_path.join(js_path, '**', '*.js')
            kit.glob os_path.join(css_path, '**', '*.css')
        ])
    .then (file_list) =>
        Q.all _.flatten(file_list).map (p) ->
            kit.remove p
    .then ->
        console.log 'Clean done.'.green

compile_coffee= (path) =>
    try
        kit.spawn coffee_bin, [
            '-c'
            '-b'
            path
        ]
        console.log '>> Compiled: '.cyan + relative(root_path, path)
    catch e
        console.log ">> Error: #{relative(root_path, path)} \n#{e}".red

compile_all_coffee= ->
    Q.fcall =>
        kit.glob os_path.join(js_path, '**', "*.coffee")
    .then (file_list) =>
        Q.all(
            _.flatten(file_list).map compile_coffee
        )

find_all= (file_type, callback) ->

compile_all_stylus= (path) ->
    rootPath = root_path

    kit.glob css_path + "/**/*.styl"
    .then (paths) ->
        if path
            paths = []
            paths.push path
        Q.all paths.map (path) ->
            console.log '>> Compiled: '.cyan + relative(rootPath, path)
            kit.readFile path, 'utf8'
            .then (str) ->
                Q.invoke stylus, 'render', str, { filename: path }

            .then (code) ->
                kit.outputFile path.replace(/\.styl$/, '.css'), code if code

            .catch (error) ->
                console.log error
    .catch (error) ->
        console.log error

task 'build', 'Build all source code.', ->
    build().then ->
        clean()
