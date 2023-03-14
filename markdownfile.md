
~~~js

# @/w500 this function is useless
def jennifer():
    # @<r400
    if pierre == cedric: # @/rw checks something useless
        print("test1")
    else:
        print("test2") # @/r
    # @r>400
    print("test3")
# 
~~~ 
this function is useless<br> <br>

~~~js

    if pierre == cedric: # @/rw checks something useless
        print("test1")
    else:
        print("test2") # @/r
    # 
~~~ 
tset test<br> <br>

~~~js
if pierre == cedric: #
~~~ 
 checks something useless<br> <br>
