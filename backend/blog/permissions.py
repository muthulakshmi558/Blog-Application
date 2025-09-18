# from rest_framework import permissions

# class IsOwnerOrReadOnly(permissions.BasePermission):
#     def has_object_permission(self, request, view, obj):
#         if request.method in permissions.SAFE_METHODS:
#             return True
#         # Allow update/delete if created_by is null (legacy posts) or matches the authenticated user
#         return obj.created_by is None or obj.created_by == request.user
    
#     # backend/blog/permissions.py


from rest_framework import permissions

class IsOwnerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.author == request.user